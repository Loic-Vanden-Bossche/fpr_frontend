import {
  useContext, useEffect, useState
} from "react";
import { CameraContext } from "..";

export type UseCameraState = {
  isLoading: boolean;
  stream: MediaStream | null;
  error: DOMException | null
}

export function useCamera() {
  const { useVideo, useAudio } = useContext(CameraContext);
  const [state, setState] = useState<UseCameraState>({
    isLoading: false,
    stream: null,
    error:null
  });

  useEffect(() => {
    if (!useVideo && !useAudio) {
      setState({
        isLoading: false,
        stream: null,
        error:null
      });
      return;
    }

    setState({
      isLoading: true,
      stream: null,
      error:null
    });

    navigator.mediaDevices.getUserMedia({
      video: useVideo,
      audio: useAudio
    }).then(stream => setState({
      isLoading: false,
      stream,
      error: null
    })).catch(error => setState({
      isLoading: false,
      stream: null,
      error
    }));

  }, [useAudio, useVideo]);

  return state;
}
