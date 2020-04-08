import React from 'react';
import PropTypes from 'prop-types';
import { Image, View, Text, StyleSheet } from 'react-native';
const ListItemDescription = ({navigateDetail, title, description, subtitle}) => (
  <View onTouchEnd={()=>{navigateDetail()}} style={styles.content}>
    <View style={styles.contentText}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  content: { paddingBottom: 12, paddingTop: 26, borderBottomWidth: 1, borderBottomColor: '#C8C8C8', flexDirection: "row", alignItems: 'center'},
  contentText: { marginLeft: 25 },
  title: { fontFamily: 'Poppins-Bold', fontSize: 18, color: '#000000DD', textAlignVertical: 'center', lineHeight: 20 },
  description: { fontFamily: 'Poppins-Medium', fontSize: 14, color: '#000000DD', textAlignVertical: 'center', lineHeight: 18 },
  subtitle: { fontFamily: 'Montserrat-SemiBoldItalic', fontSize: 11, color: '#000000ad', textAlignVertical: 'center' },
})

ListItemDescription.propTypes = {
  navigateDetail: PropTypes.func
};

ListItemDescription.defaultProps = {
  navigateDetail: ()=>{},
};

export default ListItemDescription
