import { Creators as AppCreators } from './app';
import { Creators as AuthCreators } from './auth';

export const Types = {
  CLEAR: 'store/CLEAR'
};

export default (state = '', { type }) => {
  switch (type) {
    default:
      return state;
  }
};

export const Creators = {
  clear: () => dispatch => {
    dispatch([
      AppCreators.clear(),
      AuthCreators.clear()
    ]);
  }
};