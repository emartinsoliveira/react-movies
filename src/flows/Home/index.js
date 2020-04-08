import React from 'react'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { HeaderTabBar } from '../../layout'
import MoviesListStack from '../Movies'
import SeriesListScreen from '../Series'

const AppFlow = {
  Filmes: {
    screen: MoviesListStack,
    params: {
      title: 'Filmes',
      headerTab1: 'Vender',
      titleAppTab1: 'Estou Vendendo',
      headerTab2: 'Quero Comprar',
      titleAppTab2: 'Quero Comprar',
      themeColor: '#A6D122',
      type: 'filmes'
    }
  },
  Series: {
    screen: SeriesListScreen,
    params: {
      title: 'Séries',
      headerTab1: 'Ofereço',
      titleAppTab1: 'Estou Oferecendo',
      headerTab2: 'Quero Oferecer',
      titleAppTab2: 'A procura de',
      themeColor: '#FAB80A',
      type: 'series'
    }
  }
}

const HeaderTab = createMaterialTopTabNavigator(
  AppFlow,
  {
    tabBarOptions: {
      tabStyle: {backgroundColor: 'red'}
    },
    tabBarComponent: props => (
      <HeaderTabBar {...props} />
    ),
    backBehavior: 'history',
    initialRouteName: 'Filmes',
    lazy: true
  }
);

export default HeaderTab
