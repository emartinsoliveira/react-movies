import React, {Component} from 'react'
import { View, TextInput } from 'react-native'
import { Icon } from  'native-base'

export default class SearchInput extends Component {

  render() {
    return (
      <View style={{position: 'relative'}}>
        <TextInput
          style={{ height: 40, borderRadius: 17, paddingHorizontal: 40, backgroundColor: '#F1F1F1', alignSelf: 'stretch' }}
        />
        <View style={{position: "absolute", top: 11, left: 10}}>
          <Icon type="FontAwesome" name={'search'}  style={{fontSize: 19, color: '#C7C7C7'}} />
        </View>
      </View>
    )
  }
}
