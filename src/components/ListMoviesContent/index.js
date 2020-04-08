import React, { Component } from 'react';
import { View, Image, StyleSheet, FlatList, TouchableHighlight, Text} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Config from 'react-native-config';

import { Creators as MoviesCreators } from '../../reducers/movies';
import { RecipeCard } from '../../assets/styles/AppStyles';

class ListMoviesContent extends Component {
  constructor(props) {
    super(props);
    this.fetch()
  }

  fetch = async () => {
    const { type } = this.props;
    await this.props.fetchMovies(type);
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
    const { stylesContainer, movies, type } = this.props;
    let dataItens = [];

    if (movies[type]) {
      dataItens = movies[type].results;
      return (
        <View style={styles.contentRounded, { ...stylesContainer }}>
          {
            dataItens.length ?
              <FlatList
                horizontal
                showsVerticalScrollIndicator={false}
                data={dataItens}
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

    return(
      <View style={styles.cardEmpty}>
        <Text style={styles.cardTextEmpty}>
          Sem filmes a exibir para a categoria
        </Text>
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

const mapDispatchToProps = (dispatch) => {
  return({
    fetchMovies: (payload) => { dispatch(MoviesCreators.fetchMovies(payload)) }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(ListMoviesContent);
