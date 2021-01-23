import { useState } from "react";

export default function useVisualMode(initMode, initMapMode) {
  const [mode, setMode] = useState(initMode);
  const [mapMode, setMapMode] = useState(initMapMode);

  const transition = (mode) => {
    setMode(mode);
  };

  return {
    mode,
    mapMode,
    setMapMode
  };
}
