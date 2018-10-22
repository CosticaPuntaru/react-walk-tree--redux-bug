import { combineReducers } from 'redux'
import locationReducer from './location'
import store1 from './store1'
import store2 from './store2'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    store1,
    store2,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
