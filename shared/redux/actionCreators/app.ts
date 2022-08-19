import {ThunkAction} from 'redux-thunk';
import {AppActionType, TAppAction} from '../actionTypes/app';
import {RootState} from '../reducers';

export const splashLaunched = (): ThunkAction<
  void,
  RootState,
  unknown,
  TAppAction
> => {
  return async dispatch => {
    await dispatch({
      type: AppActionType.SPLASH_LAUNCHED,
    });
  };
};

export const biometricStatusSetter = (
  status: boolean,
): ThunkAction<void, RootState, unknown, TAppAction> => {
  return async dispatch => {
    await dispatch({
      type: AppActionType.BIOMETRIC_STATUS,
      payload: status,
    });
  };
};
