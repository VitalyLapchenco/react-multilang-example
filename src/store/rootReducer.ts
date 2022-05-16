import { combineReducers } from 'redux';
import { SomeFeatureReducer as someFeature } from './SomeFeature/reduser';

export const rootReducer = combineReducers({
  someFeature,
});
