import { StyleSheet, Dimensions } from 'react-native';
import { DefaultTheme } from 'react-native-paper';


// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
// item size
const RECIPE_ITEM_WIDTH = 120;
const RECIPE_ITEM_HEIGHT = 120;

export const RecipeCard = StyleSheet.create({
  container: {
    flex: 1,
    width: RECIPE_ITEM_WIDTH,
    marginRight: 20,
    marginTop: 20,
    height: RECIPE_ITEM_HEIGHT,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 15
  },
  photo: {
    height: 90,
    width: null,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  title: {
    fontSize: 13,
    textAlign: 'center',
    color: '#444444',
    paddingHorizontal: 10,
    paddingVertical: 10
  }
});

export const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};
