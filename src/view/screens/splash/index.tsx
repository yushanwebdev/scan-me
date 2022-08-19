import {Button, Center, Input, Skeleton, Stack, VStack} from 'native-base';
import * as React from 'react';
import ReactNativeBiometrics from 'react-native-biometrics';
import {useDispatch} from 'react-redux';
import {
  biometricStatusSetter,
  splashLaunched,
} from '../../../../shared/redux/actionCreators/app';
import {useTypedSelector} from '../../../../shared/utilities/useTypeSelector';

import {tabbedNavigation} from '../../../navigators/navigation';

interface Props {}

const rnBiometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});

const Splash: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const {biometricStatus} = useTypedSelector(state => state.app);

  const navigateToHome = () => {
    tabbedNavigation();
  };

  const biometricKeysChecker = async () => {
    const {keysExist} = await rnBiometrics.biometricKeysExist();

    console.log('keysExist', keysExist);

    dispatch(biometricStatusSetter(keysExist));
  };

  const onLoginWithBiometrics = async () => {
    let epochTimeSeconds = Math.round(new Date().getTime() / 1000).toString();
    let payload = epochTimeSeconds + 'some message';

    console.log('payload', payload);

    rnBiometrics
      .createSignature({
        promptMessage: 'Sign in',
        payload: payload,
      })
      .then(resultObject => {
        console.log('resultObject', resultObject);
      })
      .catch(reason => {
        console.log('reason', reason);
      });

    // if (success) {
    //   console.log('signature', signature);
    //   navigateToHome();
    // }
  };

  React.useEffect(() => {
    splashLaunched();
    biometricKeysChecker();
  }, []);

  return (
    <VStack justifyContent="center" flex={1} safeArea>
      <Skeleton isLoaded={biometricStatus !== null}>
        <Center>
          {biometricStatus ? (
            <Stack space={4}>
              <Button onPress={onLoginWithBiometrics}>
                Login with Biometrics
              </Button>
              <Button variant="subtle">Login with Pin</Button>
            </Stack>
          ) : (
            <Stack space={4} w="100%" alignItems="center">
              <Input
                w={{
                  base: '75%',
                  md: '25%',
                }}
                placeholder="Name"
                value="yushan"
              />
              <Input
                w={{
                  base: '75%',
                  md: '25%',
                }}
                type="password"
                placeholder="Password"
                value="pass"
              />
              <Button onPress={navigateToHome}>Log In</Button>
            </Stack>
          )}
        </Center>
      </Skeleton>
    </VStack>
  );
};

export default Splash;
