import React, { Component } from 'react'
import { Button } from 'native-base'
import { View, Text } from 'react-native';

class SearchScreen extends Component {
  static navigationOptions = ({navigations}) =>({
    title: 'Procurar'
  });

  render() {
    const {navigation} = this.props;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button onPress={()=>{navigation.goBack()}}>
          <Text>Procurar</Text>
        </Button>
      </View>
    );
  }
}

export default SearchScreen