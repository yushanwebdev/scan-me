import {Box, Button, VStack} from 'native-base';
import * as React from 'react';

export interface Props {}

const Settings: React.FC<Props> = () => {
  return (
    <VStack justifyContent="center" alignItems="center" flex={1} safeArea>
      <Box maxW="xs">
        <Button onPress={() => {}}>Enable Biometric Authentication</Button>
      </Box>
    </VStack>
  );
};

export default Settings;
