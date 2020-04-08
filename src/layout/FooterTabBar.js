import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'native-base'


export default class FooterTabBar extends Component {

  changeRoute(toRoute) {
    const { navigation } = this.props
    navigation.navigate(toRoute)
  }

  render() {
    const { routes, index } = this.props.navigation.state
    const routeName = routes[index].key
    const routeParams = routes[index].params
    let noFooter = false
    if(routeParams && routeParams.noFooter) {
      noFooter = true
    }
    return (
      !noFooter &&
        <View style={styles.content}>
          <View onTouchEnd={()=>{this.changeRoute('Home')}}>
            <Icon style={{...(routeName === 'Home' ? styles.iconActive : styles.iconsNav)}} type="AntDesign" name="home" />
          </View>
          <View onTouchEnd={()=>{this.changeRoute('Search')}}>
            <Icon style={{...(routeName === 'Search' ? styles.iconActive : styles.iconsNav)}} type="AntDesign" name="search1" />
          </View>
          <View onTouchEnd={()=>{this.changeRoute('Launch')}}>
            <Icon style={{...(routeName === 'Launch' ? styles.iconActive : styles.iconsNav)}} type="AntDesign" name="playcircleo" />
          </View>
          <View onTouchEnd={()=>{this.changeRoute('Profile')}}>
            <Icon style={{...(routeName === 'Profile' ? styles.iconActive : styles.iconsNav)}} type="AntDesign" name="user" />
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
    height: 55,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
    backgroundColor: '#000000'
  },
  iconsNav: { color: '#FFFFFF', fontSize: 28 },
  iconsCreatePost: { width: 45, height: 45 },
  iconActive: { color: '#ff0000', fontSize: 28 }
})
