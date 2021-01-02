import { WebsocketState } from '../types/StateTypes';
import { ActionWebSocket, WS_REMOVE_DATA, WS_UPDATE_DATA, WS_UPDATE_STATUS } from '../types/WebsocketTypes';
import { ConnectionStatus } from '../types/WebsocketTypes';
import { CryptoCodes, CurrencyCodes } from '../types/CryptoTypes';

const wsInitialState: WebsocketState = {
  connectionStatus: ConnectionStatus.DISCONNECTED,
  baseCurrency: CurrencyCodes.EUR,
  cryptos: {
    filter: [{
      code: CryptoCodes.XBT,
      name: 'Bitcoin'
    }, {
      code: CryptoCodes.XRP,
      name: 'Ripple'
    }, {
      code: CryptoCodes.ETH,
      name: 'Etherium'
    }, {
      code: CryptoCodes.USDT,
      name: 'Tether'
    }, {
      code: CryptoCodes.LTC,
      name: 'Litecoin'
    }, {
      code: CryptoCodes.XDG,
      name: 'Dogecoin'
    }, {
      code: CryptoCodes.WAVES,
      name: 'Waves'
    }, {
      code: CryptoCodes.DASH,
      name: 'Dash'
    }, {
      code: CryptoCodes.LINK,
      name: 'Chainlink'
    }],
    data: {}
  }
};

const WebsocketReducer = (state: WebsocketState = wsInitialState, action: ActionWebSocket): WsState => {

  switch (action.type) {
  case WS_UPDATE_STATUS: {
    return {
      ...state,
      connectionStatus: action.payload.status
    };
  }
  case WS_UPDATE_DATA: {

    const { payload: { cryptoData } } = action;

    return {
      ...state,
      cryptos: {
        ...state.cryptos,
        data: {
          ...state.cryptos.data,
          [cryptoData.crypto.code]: cryptoData
        }
      }
    };
  }
  case WS_REMOVE_DATA: {

    const { payload: { cryptoCode } } = action;

    const { [cryptoCode]: except, ...res } = state.cryptos.data;

    return {
      ...state,
      cryptos: {
        ...state.cryptos,
        data: {
          ...res
        }
      }
    };
  }
  }

  return state;
};

export default WebsocketReducer;