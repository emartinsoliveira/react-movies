import React, { Component } from 'react'
import { Button } from 'native-base'
import { View, Text } from 'react-native';

class LaunchScreen extends Component {
  static navigationOptions = ({navigations}) =>({
    title: 'Novidades'
  });

  render() {
    const {navigation} = this.props;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button onPress={()=>{navigation.goBack()}}>
          <Text>Novidades</Text>
        </Button>
      </View>
    );
  }
}

export default LaunchScreen