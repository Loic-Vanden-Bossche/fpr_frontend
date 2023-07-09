import {
  ReactNode, createContext, useState
} from "react";

type CameraSettings = {
  useVideo: boolean;
  switchUseVideo: () => void;
  useAudio: boolean;
  switchUseAudio: () => void;
};

export const CameraContext = createContext<CameraSettings>({
  useVideo: false,
  switchUseVideo: () => void(0),
  useAudio: false,
  switchUseAudio: () => void(0)
});

type Props = {
  children: ReactNode
}

export function CameraContextProvider({ children }: Props) {
  const [useVideo, setUseVideo] = useState(true);
  const switchUseVideo = () => setUseVideo((prev) => !prev);

  const [useAudio, setUseAudio] = useState(true);
  const switchUseAudio = () => setUseAudio((prev) => !prev);

  return <CameraContext.Provider value={{
    useVideo,
    switchUseVideo,
    useAudio,
    switchUseAudio
  }}
  >
    {children}
  </CameraContext.Provider>;
}
