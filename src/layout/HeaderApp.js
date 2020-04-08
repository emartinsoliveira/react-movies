import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function HeaderApp ({navigation, scene}) {
  const { options, state } = scene.descriptor
  let title = options.title
  let badge = options.badge

  return (
    <View style={{...styles.content, height: badge ? 110 : 55 }}>
      <View style={styles.rowTitle}>
        <View style={styles.title}>
          <Text style={{...styles.titleText}}>
            {title}
          </Text>
        </View>
      </View>
    </View>
  )
} 

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 8,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
    backgroundColor: '#000000'
  },
  rowTitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  badge: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, color: 'white' },
  title: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  titleText: { fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: 18, color: '#FFFFFF' }
})
