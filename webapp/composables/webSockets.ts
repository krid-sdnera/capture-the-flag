import type {
  MessageDataFlag,
  MessageDataLog,
  MessageDataStatus,
  MessageDataTeam,
  MessageDataTracker,
} from "~/server/types/webSocket";

let socket: ReturnType<typeof useSocket> | null = null;

const logs = ref<string[]>([]);
let lastTime = Date.now();
const log = (message: string) => {
  console.log(message);
  const now = Date.now();
  const timeTaken = now - lastTime;
  logs.value.push(`${message} ${timeTaken > 0 ? `(+${timeTaken}ms)` : ""}`);
  lastTime = now;
};

export const useWebSockets = () => {
  return {
    logs,
    initialise() {
      if (!process.client) {
        return;
      }

      socket = useSocket();

      // Connection opened
      socket.on("connect", () => {
        log("[connection]: connection successful");
      });
      socket.on("disconnected", () => {
        log("[connection]: disconnected");
      });

      // Listen for messages
      socket.on("status", handleStatus);
      socket.on("flag", handleFlag);
      socket.on("team", handleTeam);
      socket.on("tracker", handleTracker);
      socket.on("log", handleLog);
    },
    sendMessage(ev: string, message: string) {
      console.log(socket);
      console.log(message);

      socket?.emit(ev, message);
    },
  };
};

function handleStatus(data: MessageDataStatus) {
  log(data.message);
}

function handleFlag(data: MessageDataFlag) {
  const { setFlag, removeFlag } = useFlag();

  switch (data.action) {
    case "create":
      setFlag(data.flag);
      log(`[flag][id ${data.flag.id}]: created`);
      break;
    case "update":
      setFlag(data.flag);
      log(`[flag][id ${data.flag.id}]: updated`);
      break;
    case "delete":
      removeFlag(data.flagId);
      log(`[flag][id ${data.flagId}]: deleted`);
      break;
  }
}

function handleTeam(data: MessageDataTeam) {
  const { setTeam, removeTeam } = useTeam();

  switch (data.action) {
    case "create":
      setTeam(data.team);
      log(`[team][id ${data.team.id}]: created`);
      break;
    case "update":
      setTeam(data.team);
      log(`[team][id ${data.team.id}]: updated`);
      break;
    case "delete":
      removeTeam(data.teamId);
      log(`[team][id ${data.teamId}]: deleted`);
      break;
  }
}

function handleTracker(data: MessageDataTracker) {
  const { setTracker, removeTracker } = useTracker();

  switch (data.action) {
    case "create":
      setTracker(data.tracker);
      log(`[tracker][id ${data.tracker.id}]: created`);
      break;
    case "update":
      setTracker(data.tracker);
      log(`[tracker][id ${data.tracker.id}]: updated`);
      break;
    case "delete":
      removeTracker(data.trackerId);
      log(`[tracker][id ${data.trackerId}]: deleted`);
      break;
  }
}

function handleLog(data: MessageDataLog) {
  const { setLog, removeLog } = useLog();

  switch (data.action) {
    case "create":
      setLog(data.log);
      log(`[log][id ${data.log.id}]: created`);
      break;
    case "update":
      setLog(data.log);
      log(`[log][id ${data.log.id}]: updated`);
      break;
    case "delete":
      removeLog(data.logId);
      log(`[log][id ${data.logId}]: deleted`);
      break;
  }
}
