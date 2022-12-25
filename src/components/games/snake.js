import React, { useState, useEffect } from "react";

// Components
import Game from "./game";

// Pixi and Games
import usePixi from "../../hooks/pixi";
import Snake from "../../games/snake/main";
import { GameState } from "../../games/contants";

export default function FrogGame() {
  const [game] = useState(new Snake());

  const { pixiRef, state } = usePixi(game, {
    score: 0,
    gameState: GameState.Inactive,
  });

  useEffect(() => {
    window.addEventListener("keydown", keydown);

    return () => {
      window.removeEventListener("keydown", keydown);
    };
  }, []);

  function keydown(e) {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        up();
        break;
      case "ArrowDown":
        e.preventDefault();
        down();
        break;
      case "ArrowLeft":
        e.preventDefault();
        left();
        break;
      case "ArrowRight":
        e.preventDefault();
        right();
        break;
      default:
        break;
    }
  }

  function up() {
    game.setDirection(0);
  }

  function down() {
    game.setDirection(1);
  }

  function left() {
    game.setDirection(2);
  }

  function right() {
    game.setDirection(3);
  }

  function start() {
    game.reset();
    game.start();
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
        title="Eating with Gertie"
        message={`Score: ${score} ${gameText && ` - ${gameText}`}`}
        pixiRef={pixiRef}
        start={start}
        gameState={gameState}
      />
    </>
  );
}
