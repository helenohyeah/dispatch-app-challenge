import { useState } from "react";

export default function useVisualMode(initial) {

  const [ mode, setMode ] = useState(initial);
  const [ history, setHistory ] = useState([initial]);

  /**
   * Transition to given mode and updates history
   */
  const transition = (mode) => {
    setMode(mode);
    setHistory(prev => [ ...prev, mode]);
  };

  /**
   * Transition to previous mode and updates history
   */
  const back = () => {
    if (history.length > 1) {
      const tempHistory = [...history];
      tempHistory.pop();
      setHistory(tempHistory);
      setMode(tempHistory[tempHistory.length - 1]);
    }
  };

  return {
    mode,
    transition,
    back
  };
}
