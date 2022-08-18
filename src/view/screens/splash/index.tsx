import {Button, Center, Input, Stack, VStack} from 'native-base';
import * as React from 'react';
import {splashLaunched} from '../../../../shared/redux/actionCreators/app';

import {tabbedNavigation} from '../../../navigators/navigation';

interface Props {}

const Splash: React.FC<Props> = () => {
  React.useEffect(() => {
    splashLaunched();
  }, []);

  const navigateToHome = () => {
    tabbedNavigation();
  };

  return (
    <VStack justifyContent="center" flex={1} safeArea>
      <Center>
        <Stack space={4} w="100%" alignItems="center">
          <Input
            w={{
              base: '75%',
              md: '25%',
            }}
            placeholder="Name"
          />
          <Input
            w={{
              base: '75%',
              md: '25%',
            }}
            type="password"
            placeholder="Password"
          />
          <Button onPress={navigateToHome}>Log In</Button>
        </Stack>
      </Center>
    </VStack>
  );
};

export default Splash;
