import {Button, Center, Stack, VStack} from 'native-base';
import * as React from 'react';
import * as Keychain from 'react-native-keychain';
import {useDispatch} from 'react-redux';
import {biometricStatusSetter} from '../../../../shared/redux/actionCreators/app';
import tabbedNavigation from '../../../navigators/navigation';

interface Props {}

const defaultOptions = {
  service: 'com.scanme',
};

const SplashBiometric: React.FC<Props> = () => {
  const dispatch = useDispatch();

  const navigateToHome = () => {
    tabbedNavigation();
  };

  const onLoginWithBiometrics = async () => {
    const keychainObject = await Keychain.getInternetCredentials(
      'scan-me-server',
      {
        ...defaultOptions,
        accessControl:
          Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE,
      },
    );

    if (keychainObject) {
      dispatch(biometricStatusSetter(true));
      navigateToHome();
    } else {
      dispatch(biometricStatusSetter(false));
    }
  };

  const onLoginWithDevicePasscode = async () => {
    try {
      const keychainObject = await Keychain.getInternetCredentials(
        'scan-me-server',
        {
          ...defaultOptions,
          accessControl: Keychain.ACCESS_CONTROL.DEVICE_PASSCODE,
        },
      );

      if (keychainObject) {
        dispatch(biometricStatusSetter(true));
        navigateToHome();
      } else {
        dispatch(biometricStatusSetter(false));
      }
    } catch (error) {
      console.log('error', (error as Error).message);
    }
  };

  return (
    <VStack justifyContent="center" flex={1} safeArea>
      <Center>
        <Stack space={4}>
          <Button onPress={onLoginWithBiometrics}>Login with Biometrics</Button>
          <Button variant="subtle" onPress={onLoginWithDevicePasscode}>
            Login with Pin
          </Button>
        </Stack>
      </Center>
    </VStack>
  );
};

export default SplashBiometric;
