import React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { FooterTabBar } from '../../layout';
import HeaderApp from '../../layout/HeaderApp'
import Home from '../Home';
import SearchScreen from './Search';
import LaunchScreen from './Launch';
import ProfileScreen from './Profile';

const AppFlow = {
  Home: Home,
  Search: {
    screen: SearchScreen,
    params: {
      title: 'Procurar'
    }
  },
  Launch: {
    screen: LaunchScreen,
    params: {
      title: 'Lançamentos'
    }
  },
  Profile: {
    screen: ProfileScreen,
    params: {
      title: 'Perfil'
    }
  }
}

const AppTab = createBottomTabNavigator(
  AppFlow,
  {
    tabBarComponent: props => (
      <FooterTabBar {...props} style={{ borderTopColor: '#605F60' }} />
    ),
    navigationOptions: ({ navigation }) => {
      let title = ''
      let themeColor = null
      let themeBadge = null
      let type = null
      let badge = null
      const tabBottomActive = navigation.state.routes[navigation.state.index]
      if(tabBottomActive.routes) {
        const routeActive = tabBottomActive.routes[tabBottomActive.index]
        if(routeActive.params) {
          title = routeActive.params.title
          themeColor = routeActive.params.themeColor
          themeBadge = routeActive.params.themeBadge
          type = routeActive.params.type
          badge = routeActive.params.badge || null
        } else {
          title = routeActive.routeName
        }
      } else {
        title = (tabBottomActive.params) ? tabBottomActive.params.title : tabBottomActive.routeName
      }
      return { title, themeColor, type, badge, themeBadge }
    },
    backBehavior: 'history',
    initialRouteName: 'Home'
  }
);

const AppStack = createStackNavigator(
  {
    Apptab: AppTab
  },
  {
    defaultNavigationOptions: () => {
      return ({
        header: HeaderApp
      })
    }
  }
)

export default AppStack
