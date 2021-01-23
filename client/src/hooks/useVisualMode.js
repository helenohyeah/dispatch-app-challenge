import { useState } from "react";

export default function useVisualMode(initial) {

  const [ mode, setMode ] = useState(initial);
  const [ history, setHistory ] = useState([initial]);

  /**
   * Transition visual modes given the mode and an optional Boolean to skip previous mode (default = false)
   */
  const transition = (mode, replace = false) => {
    setMode(mode);
    if (replace) {
      const tempHistory = [...history];
      tempHistory.pop();
      setHistory([...tempHistory, mode]);
    } else {
      setHistory(prev => [ ...prev, mode]);
    }
  };

  /**
   * Navigate back to previous mode and update mode history
   */
  const back = () => {
    console.log(history);
    if (history.length > 1) {
      const tempHistory = [...history];
      tempHistory.pop();
      setHistory(tempHistory);
      setMode(tempHistory[tempHistory.length - 1]);
    }
  }

  return {
    mode,
    transition,
    back
  };
}
