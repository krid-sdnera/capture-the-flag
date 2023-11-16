import { Prisma, Tracker } from "@prisma/client";
import prisma from "~/server/prisma";
import { TrackerCreateInput, TrackerData } from "~/server/types/tracker";

interface ResponseSuccess {
  success: true;
  tracker: TrackerData;
}
interface ResponseFailure {
  success: false;
  message: string;
}

export default defineEventHandler(
  async (event): Promise<ResponseSuccess | ResponseFailure> => {
    const body = await readBody<TrackerCreateInput>(event);

    if (!body?.name) {
      return { success: false, message: `Tracker does not have a name` };
    }

    try {
      const tracker: Tracker = await prisma.tracker.create({
        data: {
          name: body?.name,
          scoreModifier: body?.scoreModifier,
        },
      });
      const trackerData: TrackerData = {
        id: tracker.id,
        name: tracker.name,
      };
      return { success: true, tracker: trackerData };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === "P2002") {
          return {
            success: false,
            message: `A tracker already exists with this name`,
          };
        }
      }

      return { success: false, message: `an unknown error occurred` };
    }
  }
);
