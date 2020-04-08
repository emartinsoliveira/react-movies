import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, FlatList, TouchableHighlight, Image } from 'react-native';
import SearchInput from '../../components/SearchInput';
import ListMoviesContent from '../../components/ListMoviesContent';
import { connect } from 'react-redux';
import { Creators as MoviesCreators } from '../../reducers/movies';

class ListMoviesScreen extends Component {
  async componentDidMount() {
    const { navigation } = this.props;
    const parentNavigation = navigation.dangerouslyGetParent()
    this.setState({
      parentNavigation
    })

    await this.props.fetchGenres()
  }

  render() {
    const { navigation, isLoading, genres} = this.props;

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
            {
              genres.map(
                (genre, index) => (
                  <View style={styles.row} key={index}>
                    <Text>
                      { genre.name }
                    </Text>
                    <View style={{ marginBottom: 20 }}>
                      <ListMoviesContent
                        key={genre.id}
                        type={genre.id}
                        navigation={navigation}
                      />
                    </View>
                  </View>
                )
              )
            }
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

export default connect(mapStateToProps, mapDispatchToProps)(ListMoviesScreen);
