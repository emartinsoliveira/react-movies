import React,{Component} from 'react'
import { StyleSheet } from 'react-native'
import { View } from 'native-base'
import { Avatar } from 'react-native-elements'
import PropTypes from 'prop-types'

const AvatarContainer = ({userImg}) => (
  <View style={ styles.container }>
    {
      userImg ?
        <Avatar
          rounded
          size={160}
          source={{
            uri: userImg
          }}
          containerStyle={ styles.avatar }
        />
      :
        <Avatar
          rounded
          size={160}
          source={ require('../../../../assets/images/profile-pic.png') }
          containerStyle={ styles.avatar }
        />
    }
  </View>
)

AvatarContainer.propTypes = {
  userImg: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 160,
    marginTop: 20,
    elevation: 8
  },
  avatar: {
    borderWidth: 10,
    borderColor: '#000060'
  }
})

export default AvatarContainer
