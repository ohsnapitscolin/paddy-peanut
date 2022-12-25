import React, { useState } from "react";

// Components
import Game from "./game";

// Pixi and Games
import usePixi from "../../hooks/pixi";
import Jump from "../../games/jump/main";
import { GameState } from "../../games/contants";

export default function JumpGame() {
  const [game] = useState(new Jump());

  const { pixiRef, state } = usePixi(game, {
    score: 0,
    gameState: GameState.Inactive,
  });

  function start() {
    game.reset();
    game.start();
  }

  function jump() {
    game.jump();
  }

  function handleClick() {
    state.gameState === GameState.Active && jump();
  }

  function getGameText() {
    switch (state.gameState) {
      case GameState.Over:
        return "Try Again";
      default:
        return "";
    }
  }

  const { score, gameState } = state;
  const gameText = getGameText();

  return (
    <>
      <Game
        onClick={handleClick}
        title="Jumping With Freddie"
        message={`Score: ${score} ${gameText && ` - ${gameText}`}`}
        pixiRef={pixiRef}
        start={start}
        gameState={gameState}
      />
    </>
  );
}
