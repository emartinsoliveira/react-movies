import { createStackNavigator } from 'react-navigation-stack';
import ListMoviesScreen from './ListMovies';
import DinamicDetailScreen from './DinamicDetail';

const TypeProductsFlow = {
  ListMovies: ListMoviesScreen,
  DetailTab: DinamicDetailScreen,
}

const MoviesListStack = createStackNavigator(
  TypeProductsFlow,
  {
    initialRouteName: 'ListMovies',
    headerMode: "none"
  }
)

export default MoviesListStack
