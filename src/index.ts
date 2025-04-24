import { useEffect, useState } from "react";

import { PictureInPictureParams } from "./ExpoPip.types";
import ExpoPipModule from "./ExpoPipModule";

export type PictureInPictureModeChangeEvent = {
  isInPictureInPictureMode: boolean;
};

export type PictureInPictureModeChangeListener = (event: PictureInPictureModeChangeEvent) => void;

export function addPictureInPictureModeListener(
  listener: PictureInPictureModeChangeListener
) {
  return ExpoPipModule.addListener(
    "onPictureInPictureModeChanged",
    listener
  );
}

export function isInPipMode(): boolean {
  return ExpoPipModule.isInPipMode();
}

export function setPictureInPictureParams(options: PictureInPictureParams) {
  ExpoPipModule.setPictureInPictureParams(options);
}

export function enterPipMode(options: PictureInPictureParams = {}) {
  ExpoPipModule.enterPipMode(options);
}

export function useIsInPip() {
  const [isInPipMode, setInPipMode] = useState(false);

  useEffect(() => {
    const subscription = addPictureInPictureModeListener(
      ({ isInPictureInPictureMode }) => {
        setInPipMode(isInPictureInPictureMode);
      }
    );

    return () => subscription.remove();
  }, [setInPipMode]);

  return { isInPipMode };
}

export * from "./ExpoPip.types";
