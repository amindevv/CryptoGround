
import { WsTicker } from '../redux/types/WebsocketTypes';
import { CryptoData } from '../redux/types/CryptoTypes';
import { CryptoNames } from '../config/Const';

export const getCodeFromPair = (pair: string): string => {
  return pair.slice(0, pair.indexOf('/'));
};

export const cryptoDataFromMessage = (message: WsTicker): CryptoData => {
  
  const pair = message[3];
  const code = getCodeFromPair(pair);
  const name = CryptoNames[code];

  const { o: open, c: close } = message[1];

  const cryptoData: CryptoData = {
    crypto: {
      code: code,
      name: name
    },
    values: {
      open: {
        today: open[0],
        last24Hours: open[1]
      },
      close: {
        price: close[0],
        lotVolume: close[1]
      }
    }
  };

  return cryptoData;
};

export const getGrowth = (open: string, close: string): string => {
  const openFloat = parseFloat(open);
  const closeFloat = parseFloat(close);

  return ((closeFloat - openFloat) / closeFloat * 100).toPrecision(3).toString();
};