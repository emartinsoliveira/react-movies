import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, FlatList, TouchableHighlight, Image } from 'react-native';
import { connect } from 'react-redux';
import Config from 'react-native-config';

import SearchInput from '../../components/SearchInput';
import ListMoviesContent from '../../components/ListMoviesContent';
import { Creators as MoviesCreators } from '../../reducers/movies';

class ListMoviesScreen extends Component {
  async componentDidMount() {
    const { navigation } = this.props;
    const parentNavigation = navigation.dangerouslyGetParent()
    this.setState({
      parentNavigation
    })
    await this.props.fetchTrending();
    await this.props.fetchGenres();
  }

  renderTrending = ({item, index, separators}) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressRecipe(item)}>
      <View style={styles.containerListItem}>
        {
          item.poster_path ?
            <Image style={styles.photoListItem} source={{uri: Config.SERVER_IMGS + item.poster_path }} />
          :
            <Image style={styles.photoListItem} source={require('../../assets/images/img-default.png')} />
        }
        <View style={styles.rowTitleListItem}>
          <Text style={styles.titleListItem}>
            {item.title}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );

  render() {
    const { navigation, isLoading, genres, trendings} = this.props;
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
          <View style={styles.contentTrendings}>
            <Text>
              Próximos lançamentos
            </Text>
            <FlatList
              horizontal
              showsVerticalScrollIndicator={false}
              data={arrayTrendings}
              renderItem={this.renderTrending}
              keyExtractor={item => `${item.id}`}
            />
          </View>
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
  },
  contentTrendings: {
    flex: 1,
    paddingLeft: 20,
    width: '100%',
    marginBottom: 20
  },
  containerListItem: {
    flex: 1,
    width: 100,
    marginRight: 20,
    marginTop: 20,
    height: 120,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  photoListItem: {
    height: 90,
    width: 90,
    borderRadius: 100
  },
  rowTitleListItem: {
    flexGrow: 1,
    flex: 1,
  },
  titleListItem: {
    fontSize: 13,
    textAlign: 'center',
    color: '#444444',
    paddingHorizontal: 10,
    paddingVertical: 10
  },
})

const mapStateToProps = (store) => {
  return {
    isLoading: store.MoviesReducer.isLoading,
    trendings: store.MoviesReducer.trendings,
    genres: store.MoviesReducer.genres
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
