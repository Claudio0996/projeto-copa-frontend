import { createContext, useRef } from "react";

export const TvAudioContext = createContext(null);

export default function TvAudioContextProvider({ children }) {
  const AudioRef = useRef(null);

  const AudioContextValue = AudioRef;

  return <TvAudioContext.Provider value={AudioContextValue}>{children}</TvAudioContext.Provider>;
}
