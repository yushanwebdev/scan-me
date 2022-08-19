import {AppActionType, IAppState, TAppAction} from '../actionTypes/app';

const initialState: IAppState = {
  isSplashLaunched: false,
  biometricStatus: null,
};

export const appReducer = (
  state: IAppState = initialState,
  action: TAppAction,
): IAppState => {
  switch (action.type) {
    case AppActionType.SPLASH_LAUNCHED:
      return {
        ...state,
        isSplashLaunched: true,
      };
    case AppActionType.BIOMETRIC_STATUS:
      return {
        ...state,
        biometricStatus: action.payload,
      };
    default:
      return state;
  }
};
