import prisma from "~/server/prisma";
import { LogData } from "~/server/types/log";

export default defineEventHandler(async (event) => {
  const params = getQuery(event);

  const page = Number(params.page) || 1;
  const perPage = 30;

  const logs = await prisma.trackerLog.findMany({
    skip: perPage * (page - 1),
    take: perPage,
    include: {
      team: true,
      tracker: true,
    },
  });

  const logsCount = await prisma.trackerLog.count({});

  return {
    success: true,
    page: page,
    perPage: perPage,
    maxPages: Math.ceil(logsCount / perPage),
    maxItems: logsCount,
    logs: logs.map((log) => {
      const logData: LogData = {
        id: log.id,
        datetime: log.datetime.toISOString(),
        lat: log.lat,
        long: log.long,
        tracker: log.tracker,
        team: log.team,
        distance: log.distance,
      };
      return logData;
    }),
  };
});
