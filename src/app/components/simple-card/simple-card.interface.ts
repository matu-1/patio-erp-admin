export interface CardAction {
  icon: string;
  action: () => void;
  tooltip?: string;
}

export type CardActions = CardAction[];
