import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import DistanceSlice from './Slice';
import {persistReducer, persistStore} from 'redux-persist';

const rootReducer = combineReducers({
  DistanceSlice,
});

const persistConfig = {
  storage: AsyncStorage,
  key: 'distance',
};

const persistReducers = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistReducers,
});

export default store;
