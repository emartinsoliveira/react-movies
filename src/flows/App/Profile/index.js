import React, { Component } from 'react'
import { StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Container, View } from 'native-base'
import { connect } from 'react-redux';
import AnimatedLoader from "react-native-animated-loader";

import AvatarContainer from './components/avatar-container';

var width = Dimensions.get('window').width;

class ProfileScreen extends React.Component {
  static navigationOptions = ({navigations}) =>({
    title: 'Perfil'
  });

  constructor(props) {
    super(props);

    this.state = {
      user: {}
    }
  }

  render() {
    const { user } = this.state
    const { navigation, isLoading } = this.props

    if (isLoading) {
      return (
        <AnimatedLoader
          visible={isLoading}
          overlayColor="#bc5cf5"
          source={require("../../../assets/load-fast.json")}
          animationStyle={{ width: 100, height: 100 }}
          speed={2}
        />
      );
    }

    return (
      <Container style={ styles.container }>
        <ScrollView>
          <AvatarContainer
            userImg={ user.imageUrl }
          />
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    borderTopWidth: 1,
    borderTopColor: '#0000001A',
    backgroundColor: '#f0f0f0',
    paddingTop: 45,
  },
  bgContainer: {
    top: 100,
    left: -50,
    height: 350,
    width: (width + 100),
    borderRadius: 300,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 0,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  contentWrap: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    paddingHorizontal: 30
  },
})

const mapStateToProps = store => {
  return {
    isLoading: store.MoviesReducer.isLoading
  };
};

export default connect(mapStateToProps)(ProfileScreen);
