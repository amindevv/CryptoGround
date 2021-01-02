import { ImageProps } from 'react-native';
import { Currency, CurrencyCodes, CryptoCodes } from '../redux/types/CryptoTypes';

export const Containers = {
  HOME: 'HOME',
};

export const WebsocketUrl = 'wss://ws.kraken.com';

export const CryptoNames: { [key: string]: string } = {
  [CryptoCodes.XBT]: 'Bitcoin',
  [CryptoCodes.XRP]: 'Ripple',
  [CryptoCodes.ETH]: 'Etherium',
  [CryptoCodes.USDT]: 'Tether',
  [CryptoCodes.LTC]: 'Litecoin',
  [CryptoCodes.XDG]: 'Dogecoin',
  [CryptoCodes.WAVES]: 'Waves',
  [CryptoCodes.DASH]: 'Dash',
  [CryptoCodes.LINK]: 'Chainlink',
};

export const Icons: { [key: string]: ImageProps } = {
  [CryptoCodes.XBT]: require('../assets/btc.png'),
  [CryptoCodes.XRP]: require('../assets/xrp.png'),
  [CryptoCodes.ETH]: require('../assets/eth.png'),
  [CryptoCodes.USDT]: require('../assets/usdt.png'),
  [CryptoCodes.LTC]: require('../assets/ltc.png'),
  [CryptoCodes.XDG]: require('../assets/xdg.png'),
  [CryptoCodes.WAVES]: require('../assets/waves.png'),
  [CryptoCodes.DASH]: require('../assets/dash.png'),
  [CryptoCodes.LINK]: require('../assets/link.png'),
};

export const Currencies: Array<Currency> = [{
  value: CurrencyCodes.EUR,
  label: 'Euro'
}, {
  value: CurrencyCodes.USD,
  label: 'US Dollar'
}, {
  value: CurrencyCodes.GBP,
  label: 'Pound'
}, {
  value: CurrencyCodes.JPY,
  label: 'Yen'
}];