export const ActionOptions = {
  violation: "Violation: General",
  violationFlag: "Violation: Flag",
  respawn: "Respawn",
  death: "Death",
  chance: "Game of Chance",
  other: "Other",
} as const;
export type ActionOptionKeys = keyof typeof ActionOptions;

export interface ActionCreateInput {
  datetime: string;
  action: ActionOptionKeys;
  score: number;
  description: string;
  teamId: number;
}

export interface ActionUpdateInput {
  id: number;
  datetime: string;
  action: ActionOptionKeys;
  score: number;
  description: string;
  teamId: number;
}

export interface ActionData {
  id: number;
  datetime: string;
  action: ActionOptionKeys;
  score: number;
  description: string;
  teamId: number;
}
