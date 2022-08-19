import {Navigation} from 'react-native-navigation';

import * as Keychain from 'react-native-keychain';
import store from '../../shared/redux/store';
import {registerScreens} from '../view/screens';
import {showSplash, showSplashBiometric} from './navigation';

/**
 * Register screens and components for react native navigation
 */
registerScreens({store});

/**
 * Entry point for the app
 * showSplash() -> As the name suggests, shows the splash screen.
 *                 If you do not want a splash screen, directly call `tabbedNavigation()`
 *                 defined in './navigation'
 */
const App = () => {
  const checkBiometric = async () => {
    const result = await Keychain.hasInternetCredentials('scan-me-server');

    if (result) {
      showSplashBiometric();
    } else {
      showSplash();
    }
  };

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
      /**
       * Add default options right here
       */
      topBar: {visible: true, elevation: 0},
    });

    checkBiometric();
  });
};

export default App;
