import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, Image, TouchableHighlight, ActivityIndicator } from 'react-native';
import Config from 'react-native-config';
import { connect } from 'react-redux';

import { Creators as MoviesCreators } from '../../reducers/movies';

class DinamicListScreen extends Component {
  componentDidMount() {
    const { navigation } = this.props;
    const parentNavigation = navigation.dangerouslyGetParent();
    const movie = this.props.navigation.state.params;
    if (movie.item.id) this.props.fetchMovieDetail(movie.item.id)
  }

  onReturn = () => {
    this.props.navigation.navigate('ListMovies');
  }

  render() {
    const { movie, isLoading } = this.props;
    
    if (isLoading) {
      return (
        <View style={ styles.content }>
          <ActivityIndicator
            animating={ true }
            color={'#000000'}
            size="large"
            style={ styles.activityIndicator }
          />
        </View>
      )
    }

    return (
      <ScrollView>
        <View style={styles.announcement}>
          <View style={styles.imageList}>
            <View style={styles.navContent}>
              {
                movie.poster_path ?
                  <Image style={styles.image} source={{uri: Config.SERVER_IMGS + movie.poster_path }} />
                :
                  <Image style={styles.image} source={require('../../assets/images/img-default.png')} />
              }
            </View>
          </View>
          <Text style={styles.title}>
            { movie.title }
          </Text>
          <Text style={styles.subtitle}>
            {
              movie.runtime ?
               `Duração de ${movie.runtime}`
              : null
            }
          </Text>
          <Text style={{...styles.price, color: "#E2E2E2"}}>
            
          </Text>
        </View>
        <TouchableHighlight style={{paddingHorizontal: 29, marginTop: 15, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.onReturn()}>
          <Text style={{color: '#000000b3', fontSize: 16, fontFamily: 'Poppins-Bold'}}>
            Voltar
          </Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  content: { flex: 1 },
  announcement: { alignItems: "center" },
  imageList: {  },
  image: {},
  title: { color: '#000000DD', fontSize: 21, fontFamily: 'Montserrat-ExtraBold', marginTop: 10 },
  subtitle: { color: '#000000DD', fontSize: 17, fontFamily: 'Montserrat-SemiBold', lineHeight: 18 },
  price: { fontSize: 23, fontFamily: 'Montserrat-ExtraBold', letterSpacing: 0.85 },
  navContent: { alignItems: 'center', justifyContent: 'center', marginTop: 20, backgroundColor: 'white' },
  navBalls: { flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', width: 90 },
  ball: { width: 11, height: 11, borderRadius: 8 },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  }
})

const mapStateToProps = (store) => {
  return {
    isLoading: store.MoviesReducer.isLoading,
    movie: store.MoviesReducer.movie
  };
};

const mapDispatchToProps = (dispatch) => {
  return({
    fetchMovieDetail: (data) => { dispatch(MoviesCreators.fetchMovieDetail(data)) }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(DinamicListScreen);
