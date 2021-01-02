import { Crypto, CryptoData, CurrencyCodes } from './CryptoTypes';
import { ConnectionStatus } from './WebsocketTypes';

export interface RootState {
  socketState: WebsocketState
}

export interface WebsocketState {
  connectionStatus: ConnectionStatus;
  baseCurrency: CurrencyCodes;
  cryptos: {
    filter: Array<Crypto>,
    data: {
      [code: string]: CryptoData
    }
  }
} 