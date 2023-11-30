export const StatSetType = {
  flagMinutes: "Flag Minutes",
  longestTimeWithFlag: "Longest Time With Flag",
  longestTimeWithoutFlag: "Longest Time Without Flag",
  maxConcurrentFlags: "Max Concurrent Flags",
  flagVisibilityViolations: "Flag Visibility Violations",
  capturedLifeTokens: "Captured Life Tokens",
  missingLifeTokenViolations: "Missing Life Token Violations",
  respawns: "Respawns",
  gameOfChanceWins: "Game Of Chance Wins",
  gameOfChanceLoses: "Game Of Chance Loses",
} as const;
export type StatSetTypeKey = keyof typeof StatSetType;

export interface StatSet {
  raw: number;
  score: number;
  type: StatSetTypeKey;
  description: string;
  link: string;
}

export interface StatData {
  statTypes: typeof StatSetType;
  teams: {
    id: number;
    stats: Record<StatSetTypeKey, StatSet>;
    score: number;
  }[];
}
