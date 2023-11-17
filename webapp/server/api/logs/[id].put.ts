import { Prisma, TrackerLog } from "@prisma/client";
import prisma from "~/server/prisma";
import { LogUpdateInput, LogData } from "~/server/types/log";

interface ResponseSuccess {
  success: true;
  log: LogData;
}
interface ResponseFailure {
  success: false;
  message: string;
}

export default defineEventHandler(
  async (event): Promise<ResponseSuccess | ResponseFailure> => {
    if (!event.context.params?.id) {
      return { success: false, message: "missing id in url" };
    }

    const body = await readBody<LogUpdateInput>(event);

    if (body.id !== Number(event.context.params?.id)) {
      return { success: false, message: `ID in body does not match url path` };
    }

    if (!body?.datetime) {
      return { success: false, message: `Log does not have a datetime` };
    }

    try {
      const log = await prisma.trackerLog.update({
        where: { id: Number(event.context.params.id) },
        data: {
          datetime: body.datetime,
          lat: body.lat,
          long: body.long,
          trackerId: body.trackerId,
          teamId: body.teamId ?? undefined,
          distance: body.distance,
        },
        include: {
          team: true,
          tracker: true,
        },
      });
      const logData: LogData = {
        id: log.id,
        datetime: log.datetime.toISOString(),
        lat: log.lat,
        long: log.long,
        tracker: log.tracker,
        team: log.team,
        distance: log.distance,
      };
      return { success: true, log: logData };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === "P2002") {
          return {
            success: false,
            message: `A log already exists with this name`,
          };
        }
      }

      return { success: false, message: `an unknown error occurred` };
    }
  }
);
