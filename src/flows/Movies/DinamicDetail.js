import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableHighlight, ActivityIndicator, Dimensions } from 'react-native';
import Config from 'react-native-config';
import { connect } from 'react-redux';
import { Image } from 'react-native-elements';

import { Creators as MoviesCreators } from '../../reducers/movies';


const { width } = Dimensions.get('window');
const SCREEN_WIDTH = width;

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
      <ScrollView style={styles.content}>
        <View style={styles.content}>
          <View style={styles.imageList}>
            <Image
              source={{ uri: Config.SERVER_IMGS + movie.backdrop_path }}
              style={ styles.image }
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
          <Text style={styles.title}>
            { movie.original_title }
          </Text>
          <Text style={styles.subtitle}>
            {
              movie.runtime ?
               `Duração de ${movie.runtime}`
              : null
            }
          </Text>
          <Text style={styles.overview}>
            { movie.overview }
          </Text>
        </View>
        <TouchableHighlight style={ styles.btnReturn } onPress={() => this.onReturn()}>
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
  activityIndicator: { flex: 1, justifyContent: 'center', alignItems: 'center', height: 80 },
  imageList: { alignItems: 'center', justifyContent: 'center' },
  image: { width: SCREEN_WIDTH, height: 200 },
  title: { color: '#000000DD', fontSize: 21, fontFamily: 'Montserrat-ExtraBold', marginTop: 10, marginLeft: 20 },
  subtitle: { color: '#000000DD', fontSize: 12, fontFamily: 'Montserrat-SemiBold', lineHeight: 18, marginLeft: 20 },
  overview: { flex: 1, fontSize: 13, fontFamily: 'Montserrat', color: '#000000DD', marginHorizontal: 20, marginTop: 20, textAlign: 'justify' },
  btnReturn: {paddingHorizontal: 29, marginTop: 20, marginBottom: 30, textAlign: 'left' }
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
