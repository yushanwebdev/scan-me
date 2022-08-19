import {Box, Button, Text, useToast, VStack} from 'native-base';
import * as React from 'react';
import {Linking, NativeModules, Platform} from 'react-native';
import {useDispatch} from 'react-redux';

import * as Keychain from 'react-native-keychain';
import {biometricStatusSetter} from '../../../../shared/redux/actionCreators/app';

export interface Props {}

const {RNSettingsOpen} = NativeModules;

const defaultOptions = {
  service: 'com.scanme',
};

const authOptions: Keychain.Options = {
  accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
};

const Settings: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const onEnable = async () => {
    try {
      const type = await Keychain.getSupportedBiometryType();

      switch (type) {
        case Keychain.BIOMETRY_TYPE.FACE_ID:
          authOptions.accessControl =
            Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE;
          break;
        case Keychain.BIOMETRY_TYPE.FINGERPRINT:
          authOptions.accessControl =
            Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE;
          break;
        default:
          dispatch(biometricStatusSetter(false));
          return Platform.OS === 'ios'
            ? await Linking.openSettings()
            : await RNSettingsOpen.openSettings();
      }

      toast.show({
        render: () => {
          return (
            <Box bg="emerald.500" px="2" py="1" rounded="sm">
              <Text color="white">Successful</Text>
            </Box>
          );
        },
      });

      await Keychain.setInternetCredentials(
        'scan-me-server',
        'yushan',
        'Swegvff%$22%^3673',
        {
          ...defaultOptions,
          ...authOptions,
        },
      );

      dispatch(biometricStatusSetter(true));
    } catch (error) {
      console.log('error', error);
    }
  };

  // const onEnableBiometric = async () => {
  //   let {available, biometryType} = await rnBiometrics.isSensorAvailable();
  //   if (available && biometryType === BiometryTypes.TouchID) {
  //     console.log('TouchID is supported', biometryType);
  //   } else if (available && biometryType === BiometryTypes.FaceID) {
  //     console.log('FaceID is supported', biometryType);
  //   } else if (available && biometryType === BiometryTypes.Biometrics) {
  //     console.log('Biometric is supported', biometryType);
  //   } else {
  //     dispatch(biometricStatusSetter(false));

  //     return Platform.OS === 'ios'
  //       ? await Linking.openSettings()
  //       : await RNSettingsOpen.openSettings();
  //   }

  //   const {publicKey} = await rnBiometrics.createKeys();

  //   console.log('publicKey', publicKey);

  //   dispatch(biometricStatusSetter(true));
  // };

  return (
    <VStack justifyContent="center" alignItems="center" flex={1} safeArea>
      <Box maxW="xs">
        <Button onPress={onEnable}>Enable Biometric Authentication</Button>
      </Box>
    </VStack>
  );
};

export default Settings;
