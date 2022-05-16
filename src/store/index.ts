import { applyMiddleware, compose, createStore, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { rootReducer } from './rootReducer';

const middlewares: Middleware[] = [];

if (__DEV__) {
  // because this is the way of lib import
  /* eslint-disable-next-line @typescript-eslint/no-var-requires */
  middlewares.push(require('redux-immutable-state-invariant').default());
}

middlewares.push(thunk);

// hard to type, such typing doesn't break the types at all
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const composeFunc: any = __DEV__ ? composeWithDevTools : compose;

export const store = createStore(rootReducer, composeFunc(applyMiddleware(...middlewares)));

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
