import {Button, Center, Input, Stack, VStack} from 'native-base';
import * as React from 'react';

import {tabbedNavigation} from '../../../navigators/navigation';

interface Props {}

const Splash: React.FC<Props> = () => {
  const navigateToHome = async () => {
    await tabbedNavigation();
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
      </Center>
    </VStack>
  );
};

export default Splash;
