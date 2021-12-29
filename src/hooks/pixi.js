import { useEffect, useRef, useState } from "react";

export default function usePixi() {
  const pixiRef = useRef(null);
  const [app, setApp] = useState(null);
  const [loader, setLoader] = useState(null);

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

  return { pixiRef, app, loader };
}
