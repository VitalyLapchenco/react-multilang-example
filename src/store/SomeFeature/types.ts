import { SET_SOME_FEATURE } from '@/store/SomeFeature/actionTypes';

export type TSomeFeature = string;

export interface ISetSomeFeatureAction {
  type: typeof SET_SOME_FEATURE;
  payload: TSomeFeature;
}

export interface ISomeState {
  feature: TSomeFeature;
}
