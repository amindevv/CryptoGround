import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import * as actions from '../redux/types/WebsocketTypes';
import CryptoWebsocket from './CryptoWebsocket';

const Websocket = (): Middleware => {

  const cryptoWebsocket = new CryptoWebsocket();

  const websocketActionHandlers = {
    [actions.WS_OPEN]: cryptoWebsocket.connect,
    [actions.WS_CLOSE]: cryptoWebsocket.disconnect,
  };

  return (store: MiddlewareAPI) =>
    (next: Dispatch<actions.ActionWebSocket>) =>
      (action: actions.ActionWebSocket) => {

        const { dispatch } = store;
        const { type, payload } = action;

        if (type) {
          const handler = Reflect.get(websocketActionHandlers, type);

          if (handler) {
            handler(dispatch, payload);
          } else {
            return next(action);
          }
        }
      };
};

export default Websocket;