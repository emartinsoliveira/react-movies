import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, FlatList, TouchableHighlight, Image } from 'react-native';
import Config from 'react-native-config';
import SearchInput from '../../components/SearchInput';
import { connect } from 'react-redux';
import { Creators as MoviesCreators } from '../../reducers/movies';
import { RecipeCard } from '../../assets/styles/AppStyles';

class SeriesListScreen extends Component {
  state = {
    recomendados: [],
    categorias: [],
    parentNavigation: null,
    type: ''
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const parentNavigation = navigation.dangerouslyGetParent()
    this.setState({
      parentNavigation
    })
  }

  onPressRecipe = item => {
    this.props.navigation.navigate('DetailTab', { item });
  };

  renderMovie = ({item, index, separators}) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressRecipe(item)}>
      <View style={RecipeCard.container}>
        <Image style={RecipeCard.photo} source={{uri: Config.SERVER_IMGS + item.poster_path }} />
        <Text style={RecipeCard.title}>{item.title}</Text>
      </View>
    </TouchableHighlight>
  );

  render() {
    const { navigation, isLoading, genres, highlights, trendings } = this.props;
    const arrayTrendings = trendings.results || []

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
      <View style={styles.content}>
        <View style={styles.search}>
          <SearchInput />
        </View>
        <ScrollView>
          <View style={styles.rowContent}>
            <Text>
              Series
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1
  },
  search: { alignSelf: 'stretch', marginBottom: 6 },
  recommendedContent: { alignSelf: 'stretch', alignItems: 'flex-start', marginBottom: 20 },
  recommendedRow: {flexDirection: "row", justifyContent: "space-evenly", alignSelf: "stretch"},
  categoryColumns: {flexGrow: 1, flexWrap: 'wrap', flexDirection: "row", justifyContent: "space-between"},
  title: { color: '#000000CC', fontFamily: 'Poppins-Bold', fontSize: 13, marginBottom: 7 },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  },
  rowContent: {
  },
  row: {
    flex: 1,
    paddingLeft: 20,
    width: '100%'
  }
})

const mapStateToProps = (store) => {
  return {
    isLoading: store.MoviesReducer.isLoading,
    trendings: store.MoviesReducer.trendings,
    genres: store.MoviesReducer.genres,
    highlights: store.MoviesReducer.highlights
  };
};

const mapDispatchToProps = (dispatch) => {
  return({
    fetchGenres: (data) => { dispatch(MoviesCreators.fetchGenres(data)) },
    fetchTrending: (data) => { dispatch(MoviesCreators.fetchTrending(data)) },
    fetchMovies: (data) => { dispatch(MoviesCreators.fetchMovies(data)) }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(SeriesListScreen);
