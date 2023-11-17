import { TeamData } from "./team";
import { TrackerData } from "./tracker";

export interface LogCreateInput {
  datetime: string;
  lat: number;
  long: number;
  trackerId: number;
  teamId: number;
  distance: number;
}

export interface LogUpdateInput {
  id: number;
  datetime: string;
  lat: number;
  long: number;
  trackerId: number;
  teamId: number | null;
  distance: number;
}

export interface LogData {
  id: number;
  datetime: string;
  lat: number;
  long: number;
  tracker: TrackerData;
  team: TeamData | null;
  distance: number;
}
