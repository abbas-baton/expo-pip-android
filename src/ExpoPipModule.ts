import { NativeModule, requireNativeModule } from "expo-modules-core";

export type PictureInPictureModeChangeEvent = {
  isInPictureInPictureMode: boolean;
};

type ExpoPipModuleEvents = {
  onPictureInPictureModeChanged(event: PictureInPictureModeChangeEvent): void;
};

declare class ExpoPipModule extends NativeModule<ExpoPipModuleEvents> {}

// It loads the native module object from the JSI or falls back to
// the bridge module (from NativeModulesProxy) if the remote debugger is on.
export default requireNativeModule<ExpoPipModule>("ExpoPip");
