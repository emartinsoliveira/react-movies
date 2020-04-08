import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AppTabNav from './flows/App'

const AppNavigator = createAppContainer( createSwitchNavigator(
  {
    App: AppTabNav
  },
  {
    initialRouteName: 'App'
  }
));

export default AppNavigator;
