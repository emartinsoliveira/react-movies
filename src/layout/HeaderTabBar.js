import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
const widthTab = ((screenWidth / 2) - 20);

export default class HeaderTabBar extends Component {

  changeRoute(toRoute) {
    const { navigation } = this.props
    navigation.navigate(toRoute)
  }

  render() {
    const { routes, index } = this.props.navigationState
    const activeRouteTab = routes[index]
    const routeName = activeRouteTab.key
    const routeThemeColor = activeRouteTab.params.themeColor
    const activeRouteChildren = activeRouteTab.routes ? activeRouteTab.routes[activeRouteTab.index] : {}
    let routeShowBar = true
    if(activeRouteChildren.params) {
      routeShowBar = !(activeRouteChildren.params.header === 'none')
    }
    return (
      routeShowBar &&
      <View style={styles.content}>
        <View onTouchEnd={()=>{this.changeRoute('Filmes')}}>
          <Text style={{...(routeName === 'Filmes' ? {...styles.tabTextActive} : styles.tabTextDisable), ...styles.tabText}}>
            Filmes
          </Text>
        </View>
        <View onTouchEnd={()=>{this.changeRoute('Series')}}>
          <Text style={{...(routeName === 'Series' ? {...styles.tabTextActive} : styles.tabTextDisable), ...styles.tabText}}>
            Séries
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
    alignItems: 'center',
    backgroundColor: 'white',
    height: 65,
    backgroundColor: '#000000'
  },
  tabText: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    overflow: 'hidden',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: widthTab,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  tabTextDisable: { color: '#F1F1F1' },
  tabTextActive: {
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    backgroundColor: 'red'
  }
})
