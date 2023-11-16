import { Prisma, Tracker } from "@prisma/client";
import prisma from "~/server/prisma";

interface ResponseSuccess {
  success: true;
  tracker: { id: number };
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

    try {
      await prisma.tracker.delete({
        where: { id: Number(event.context.params.id) },
      });
      return {
        success: true,
        tracker: { id: Number(event.context.params.id) },
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
      }

      return { success: false, message: `an unknown error occurred` };
    }
  }
);
