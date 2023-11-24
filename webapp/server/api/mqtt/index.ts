import { Prisma } from "@prisma/client";
import { connect } from "mqtt";
import prisma from "~/server/prisma";
import { LogData } from "~/server/types/log";
import {
  MqttTrackerMessage,
  MqttTrackerMessageJoin,
  MqttTrackerMessageUp,
} from "~/server/types/mqtt";

import { useSocketServer } from "~/server/utils/websocket";
const { sendMessage } = useSocketServer();

// TODO define these somewhere.
const username = "";
const password = "";
const applicationId = "";
const tenantId = "";

const client = connect("mqtt://test.mosquitto.org", {
  username: username,
  password: password,
});

client.on("connect", () => {
  client.subscribe(`v3/${applicationId}@${tenantId}/devices/#`, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MQTT");
    }
  });
});

client.on("message", async (topic, message) => {
  console.log(`MQTT message received:`, topic, message.toString());

  await handleTrackerMessage(
    JSON.parse(message.toString()) as unknown as MqttTrackerMessage
  );
});

async function handleTrackerMessage(message: MqttTrackerMessage) {
  if ("join_accept" in message) {
    await handleTrackerMessageJoin(message);
  }
  if ("uplink_message" in message) {
    await handleTrackerMessageUp(message);
  }
}
function handleTrackerMessageJoin(message: MqttTrackerMessageJoin) {}
async function handleTrackerMessageUp(message: MqttTrackerMessageUp) {
  const uplinkMessage = parseUpLinkMessage(message);

  // Get tracker from message.
  const trackerData = await prisma.tracker.findUniqueOrThrow({
    where: {
      name: uplinkMessage.trackerId,
    },
  });

  // Calculate current tracker zone/team base.
  const teamIdDistance = await getClosestTeamFlagZoneByLatLong(
    uplinkMessage.lat,
    uplinkMessage.long
  );

  console.log(
    `GPS trace logged: tracker ${trackerData.name} team ${teamIdDistance.id} distance ${teamIdDistance.distance}`
  );

  // Log data point.
  const log = await prisma.trackerLog.create({
    data: {
      datetime: new Date(Date.now()),
      lat: uplinkMessage.lat,
      long: uplinkMessage.long,
      teamId: teamIdDistance.id,
      trackerId: trackerData.id,
      distance: teamIdDistance.distance,
    },
  });

  // Send update via websocket.
  const logData: LogData = {
    id: log.id,
    datetime: log.datetime.toISOString(),
    lat: log.lat,
    long: log.long,
    trackerId: log.trackerId,
    teamId: log.teamId,
    distance: log.distance,
  };
  sendMessage("log", {
    type: "log",
    action: "create",
    log: logData,
  });
}

function parseUpLinkMessage(message: MqttTrackerMessageUp): {
  trackerId: string;
  lat: number;
  long: number;
} {
  const uplink = JSON.parse(message.uplink_message.frm_payload);
  return {
    trackerId: uplink.trackerId,
    lat: uplink.lat,
    long: uplink.long,
  };
}

async function getClosestTeamFlagZoneByLatLong(
  lat: number,
  long: number
): Promise<{ id: number; distance: number }> {
  try {
    await prisma.$executeRaw`CREATE EXTENSION IF NOT EXISTS cube;`;
    await prisma.$executeRaw`CREATE EXTENSION IF NOT EXISTS earthdistance;`;

    const res4 = (await prisma.$queryRaw`SELECT 
      id, earth_distance(
        ll_to_earth(t."flagZoneLat", t."flagZoneLong"),
        ll_to_earth(${lat}, ${long})
      ) as distance
     FROM "Team" as t
     ORDER BY distance ASC
     LIMIT 1
     `) as { id: number; distance: number }[];

    return { id: res4[0].id, distance: res4[0].distance };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
    }

    throw e;
  }
}
