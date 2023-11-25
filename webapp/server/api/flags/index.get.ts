import { Prisma } from "@prisma/client";
import prisma from "~/server/prisma";
import { FlagData } from "~/server/types/flag";

interface ResponseSuccess {
  success: true;
  page: number;
  perPage: number;
  maxPages: number;
  maxItems: number;
  flags: FlagData[];
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

      const flags = await prisma.flag.findMany({
        skip: perPage * (page - 1),
        take: perPage,
        orderBy: {
          datetime: "desc",
        },
      });

      const flagsCount = await prisma.flag.count({});

      return {
        success: true,
        page: page,
        perPage: perPage,
        maxPages: Math.ceil(flagsCount / perPage),
        maxItems: flagsCount,
        flags: flags.map((flag) => {
          const flagData: FlagData = {
            id: flag.id,
            datetime: flag.datetime.toISOString(),
            windowSize: flag.windowSize,
            scoreModifier: flag.scoreModifier,
            lat: flag.lat,
            long: flag.long,
            trackerId: flag.trackerId,
            teamId: flag.teamId,
            distance: flag.distance,
          };
          return flagData;
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
