import api from '../services/api';

export const Types = {
  IS_LOADING: 'movies/IS_LOADING',
  TRENDINGS: 'movies/TRENDINGS',
  GENRES: 'movies/GENRES',
  MOVIES: 'movies/MOVIES',
  MOVIE: 'movies/MOVIE',
  CLEAR: 'movies/CLEAR'
};

const INITIAL_STATE = {
  isLoading: false,
  trendings: {},
  genres: [],
  movies: {},
  movie: {}
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case Types.IS_LOADING:
      return { ...state, isLoading: payload };
    case Types.TRENDINGS:
      return { ...state, trendings: payload };
    case Types.GENRES:
      return { ...state, genres: payload };
    case Types.MOVIES:
      return { ...state, movies: payload };
    case Types.MOVIE:
      return { ...state, movie: payload };
    case Types.CLEAR:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const Creators = {
  setIsLoading: isLoading => ({
    type: Types.IS_LOADING,
    payload: isLoading
  }),
  setTrendings: categories => ({
    type: Types.TRENDINGS,
    payload: categories
  }),
  setGenres: genres => ({
    type: Types.GENRES,
    payload: genres
  }),
  setMovies: movies => ({
    type: Types.MOVIES,
    payload: movies
  }),
  setMovie: movie => ({
    type: Types.MOVIE,
    payload: movie
  }),
  clear: () => ({
    type: Types.CLEAR
  }),
  fetchGenres: (type) => dispatch => {
    dispatch(Creators.setIsLoading(true));
    api
      .get(`/genre/movie/list`)
      .then(res => {
        const data = res.data.genres || []
        dispatch([
          Creators.setIsLoading(false),
          Creators.setGenres(data)
        ]);
      })
      .catch((error) => {
        console.log(error)
        dispatch(Creators.setIsLoading(false));
      });
  },
  fetchTrending: (type) => dispatch => {
    dispatch(Creators.setIsLoading(true));
    api
      .get(`/trending/movie/week`)
      .then(res => {
        dispatch([
          Creators.setIsLoading(false),
          Creators.setTrendings(res.data)
        ]);
      })
      .catch((error) => {
        dispatch(Creators.setIsLoading(false));
      });
  },
  fetchMovies: (type) => (dispatch, getState) => {
    api
      .get(`/movie/${type}/lists`)
      .then(res => {
        const moviesList = getState().MoviesReducer.movies;
        moviesList[type] = res.data;
        dispatch([
          Creators.setMovies(moviesList)
        ]);
      }).catch((error) => {
        return false;
      });
  },
  fetchMovieDetail: (id) => (dispatch) => {
    dispatch(Creators.setIsLoading(true));
    api
      .get(`/movie/${id}`)
      .then(res => {
        dispatch([
          Creators.setMovie(res.data),
          Creators.setIsLoading(false)
        ]);
      }).catch((error) => {
        dispatch(Creators.setIsLoading(false));
        return false;
      });
  }
};
