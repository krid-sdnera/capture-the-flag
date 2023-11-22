import { LogData } from "./log";
import { TeamData } from "./team";
import { TrackerData } from "./tracker";

export const SocketServerRoomToken = "socket-server-room-token";

export type MessageData =
  | MessageDataTeam
  | MessageDataTracker
  | MessageDataLog
  | MessageDataStatus;

export type MessageDataTeam =
  | {
      type: "team";
      action: "create" | "update";
      team: TeamData;
    }
  | {
      type: "team";
      action: "delete";
      teamId: number;
    };

export type MessageDataTracker =
  | {
      type: "tracker";
      action: "create" | "update";
      tracker: TrackerData;
    }
  | {
      type: "tracker";
      action: "delete";
      trackerId: number;
    };

export type MessageDataLog =
  | {
      type: "log";
      action: "create" | "update";
      log: LogData;
    }
  | {
      type: "log";
      action: "delete";
      logId: number;
    };

export type MessageDataStatus = {
  type: "status";
  message: string;
};
