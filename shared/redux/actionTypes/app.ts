export enum AppActionType {
  SPLASH_LAUNCHED = 'SPLASH_LAUNCHED',
  BIOMETRIC_STATUS = 'BIOMETRIC_STATUS',
}

interface IActionSplashLaunch {
  type: AppActionType.SPLASH_LAUNCHED;
}

interface IActionBiometricStatus {
  type: AppActionType.BIOMETRIC_STATUS;
  payload: boolean;
}

export type TAppAction = IActionSplashLaunch | IActionBiometricStatus;

export interface IAppState {
  isSplashLaunched: boolean;
  biometricStatus: boolean | null;
}
