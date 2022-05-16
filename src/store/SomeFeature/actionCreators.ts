import { ISetSomeFeatureAction, TSomeFeature } from '@/store/SomeFeature/types';
import { SET_SOME_FEATURE } from '@/store/SomeFeature/actionTypes';

export const setSomeFeatureAction = (data: TSomeFeature): ISetSomeFeatureAction => {
  return {
    type: SET_SOME_FEATURE,
    payload: data,
  };
};
