import { createStore, applyMiddleware, combineReducers } from 'redux';
import WebsocketReducer from '../reducers/WebsocketReducer';
import Websocket from '../../websocket/WebsocketMiddleWare';

const rootReducer = combineReducers({
  socketState: WebsocketReducer
});

export const configureStore = createStore(rootReducer, applyMiddleware(Websocket()));