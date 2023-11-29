export interface ActionCreateInput {
  datetime: string;
  action: "violation" | "respawn" | "death" | "chance" | "other";
  score: number;
  description: string;
  teamId: number;
}

export interface ActionUpdateInput {
  id: number;
  datetime: string;
  action: "violation" | "respawn" | "death" | "chance" | "other";
  score: number;
  description: string;
  teamId: number;
}

export interface ActionData {
  id: number;
  datetime: string;
  action: "violation" | "respawn" | "death" | "chance" | "other";
  score: number;
  description: string;
  teamId: number;
}
