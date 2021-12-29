import { useCallback, useEffect, useRef, useState } from "react";

export default function usePixi(game, initialState) {
  const pixiRef = useRef(null);

  const [app, setApp] = useState(null);
  const [loader, setLoader] = useState(null);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    async function initialize() {
      const { Application, Loader } = await import("pixi.js");

      if (!pixiRef) return;

      const app = new Application({
        width: 300,
        height: 300,
        transparent: true,
      });

      // The application will create a canvas element for you that you
      // can then insert into the DOM.
      pixiRef.current.appendChild(app.view);

      setApp(app);
      setLoader(new Loader());
    }
    initialize();
  }, [pixiRef]);

  const updateState = useCallback(
    newState => {
      setState({ ...state, ...newState });
    },
    [state, setState]
  );

  useEffect(() => {
    if (!app || !loader) return;
    game.initialize(app, loader);
  }, [game, app, loader]);

  useEffect(() => {
    game.setUpdateState(updateState);
  }, [game, updateState]);

  return { pixiRef, state };
}
