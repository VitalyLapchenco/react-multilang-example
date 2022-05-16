import { ISetSomeFeatureAction, ISomeState } from './types';
import { SET_SOME_FEATURE } from './actionTypes';

const initialState: ISomeState = {
  feature: '',
};

export const SomeFeatureReducer = (state: ISomeState = initialState, action: ISetSomeFeatureAction) => {
  switch (action.type) {
    case SET_SOME_FEATURE:
      return { ...state, feature: action.payload };
    default:
      return state;
  }
};
