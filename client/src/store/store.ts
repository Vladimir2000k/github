import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {logger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import {languagePersistConfig} from './common/localStoragePersistance';
import rootReducer from './common/rootReducer';
import rootSaga from './common/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, logger];

const composedEnhancers = composeWithDevTools(applyMiddleware(...middleware));

const persistedReducer = persistReducer(languagePersistConfig, rootReducer);

const store = createStore(persistedReducer, composedEnhancers);
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
