import { Prisma } from "@prisma/client";
import prisma from "~/server/prisma";
import { LogData } from "~/server/types/log";

interface ResponseSuccess {
  success: true;
  page: number;
  perPage: number;
  maxPages: number;
  maxItems: number;
  logs: LogData[];
}
interface ResponseFailure {
  success: false;
  message: string;
}

export default defineEventHandler(
  async (event): Promise<ResponseSuccess | ResponseFailure> => {
    try {
      const params = getQuery(event);

      const page = Number(params.page) || 1;
      const perPage = 30;

      const logs = await prisma.trackerLog.findMany({
        orderBy: {
          datetime: "desc",
        },
        skip: perPage * (page - 1),
        take: perPage,
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
            trackerId: log.trackerId,
            teamId: log.teamId,
            distance: log.distance,
          };
          return logData;
        }),
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
      }

      return { success: false, message: `an unknown error occurred` };
    }
  }
);
