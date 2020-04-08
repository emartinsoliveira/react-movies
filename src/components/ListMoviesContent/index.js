import React, { Component } from 'react';
import { View, Image, StyleSheet, FlatList, TouchableHighlight, Text} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Config from 'react-native-config';

import { Creators as MoviesCreators } from '../../reducers/movies';
import { RecipeCard } from '../../assets/styles/AppStyles';
import api from '../../services/api';

class ListMoviesContent extends Component {
  state = {
    movies: []
  }

  constructor(props) {
    super(props);
    this.fetch()
  }

  fetchMovies = () => {
    const { type } = this.props;
    const params = {
      with_genres: type
    }
    return new Promise((resolve, reject) => {
      api
        .get(`/discover/movie`, params)
        .then(res => {
          return resolve(res.data);
        }).catch((error) => {
          return reject(error);
        });
    });
  }

  fetch = async () => {
    const { type } = this.props;
    const data = await this.fetchMovies(type);
    if (data.results) {
      this.setState({
        movies: data.results
      })
    }
  }
  
  onPressRecipe = item => {
    this.props.navigation.navigate('DetailTab', { item });
  };

  renderMovie = ({item, index, separators}) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressRecipe(item)}>
      <View style={RecipeCard.container}>
        {
          item.poster_path ?
            <Image style={RecipeCard.photo} source={{uri: Config.SERVER_IMGS + item.poster_path }} />
          :
            <Image style={RecipeCard.photo} source={require('../../assets/images/img-default.png')} />
        }
        <Text style={RecipeCard.title}>{item.title}</Text>
      </View>
    </TouchableHighlight>
  );

  render() {
    const { stylesContainer, type } = this.props;
    const { movies } = this.state

    return (
      <View style={styles.contentRounded, { ...stylesContainer }}>
        {
          movies.length ?
            <FlatList
              horizontal
              showsVerticalScrollIndicator={false}
              data={movies}
              renderItem={this.renderMovie}
              keyExtractor={item => `${item.id}`}
            />
          : 
            <View style={styles.cardEmpty}>
              <Text style={styles.cardTextEmpty}>
                Sem filmes a exibir
              </Text>
            </View>
        }
      </View>
    )
  }
}

ListMoviesContent.propTypes = {
  key: PropTypes.string,
  type: PropTypes.number
};

const styles = StyleSheet.create({
  contentRounded: { alignItems: "center", justifyContent: "center", borderRadius: 200 },
  cardEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 60
  },
  cardTextEmpty: {
    color: '#9e9e9e'
  }
})

const mapStateToProps = (store) => {
  return {
    movies: store.MoviesReducer.movies,
  };
};

export default connect(mapStateToProps)(ListMoviesContent);
