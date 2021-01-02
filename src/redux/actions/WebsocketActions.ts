import { CryptoData } from '../types/CryptoTypes';
import { ConnectionStatus } from '../types/WebsocketTypes';
import {
  ActionOpenWebsocket,
  ActionCloseWebsocket,
  ActionWsUpdateStatus,
  ActionUpdateData,
  ActionRemoveData,
  WS_OPEN,
  WS_CLOSE,
  WS_UPDATE_STATUS,
  WS_UPDATE_DATA,
  WS_REMOVE_DATA,
  WebsocketParams
} from '../types/WebsocketTypes';

export const openWebsocket = (payload: WebsocketParams): ActionOpenWebsocket => {

  const action: ActionOpenWebsocket = {
    type: WS_OPEN,
    payload: payload
  };

  return action;
};

export const closeWebsocket = (): ActionCloseWebsocket => {

  const action: ActionCloseWebsocket = {
    type: WS_CLOSE,
    payload: undefined
  };

  return action;
};

export const updateStatus = (status: ConnectionStatus): ActionWsUpdateStatus => {

  const action: ActionWsUpdateStatus = {
    type: WS_UPDATE_STATUS,
    payload: {
      status: status
    }
  };

  return action;
};

export const updateData = (cryptoData: CryptoData): ActionUpdateData => {
  const action: ActionUpdateData = {
    type: WS_UPDATE_DATA,
    payload: {
      cryptoData: cryptoData
    }
  };

  return action;
};

export const removeData = (cryptoCode: string): ActionRemoveData => {
  const action: ActionRemoveData = {
    type: WS_REMOVE_DATA,
    payload: {
      cryptoCode: cryptoCode
    }
  };

  return action;
};