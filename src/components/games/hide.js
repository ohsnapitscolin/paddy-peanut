import React, { useState } from "react";

// Components
import Game from "./game";

// Pixi and Games
import usePixi from "../../hooks/pixi";
import Find from "../../games/hide/main";
import { GameState } from "../../games/contants";

export default function FrogGame() {
  const [game] = useState(new Find());

  const { pixiRef, state } = usePixi(game, {
    streak: 0,
    gameState: GameState.Inactive,
  });

  function start() {
    game.start();
  }

  function getGameText() {
    switch (state.gameState) {
      case GameState.Win:
        return "Winner!";
      case GameState.Over:
        return "Try Again";
      default:
        return "";
    }
  }

  const { streak, gameState } = state;
  const gameText = getGameText();

  return (
    <>
      <Game
        title="Hide & Seek With Tommy"
        message={`Streak: ${streak} ${gameText && ` - ${gameText}`}`}
        pixiRef={pixiRef}
        start={start}
        gameState={gameState}
      />
    </>
  );
}
