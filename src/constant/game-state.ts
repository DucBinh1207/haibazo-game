export const GameState = {
  IDLE: 1,
  PLAY: 2,
  LOST: 3,
  WON: 4,
  AUTO: 5,
};

export const TitleMapping = {
  [GameState.IDLE]: "let's play",
  [GameState.PLAY]: "let's play",
  [GameState.AUTO]: "let's play",
  [GameState.LOST]: "game over",
  [GameState.WON]: "all cleared",
};

export type GameStateType = (typeof GameState)[keyof typeof GameState];
