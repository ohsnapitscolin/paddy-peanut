import { useEffect } from "react";
import { navigate } from "gatsby";

export default function GamesPage() {
  useEffect(() => {
    navigate("/games/find");
  }, []);

  return null;
}
