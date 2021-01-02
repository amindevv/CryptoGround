export enum CurrencyCodes {
  EUR = 'EUR',
  USD = 'USD',
  GBP = 'GBP',
  JPY = 'JPY'
}

export type Currency = {
  value: CurrencyCodes;
  label: string;
}

export enum CryptoCodes {
  XBT = 'XBT',
  XRP = 'XRP',
  ETH = 'ETH',
  USDT = 'USDT',
  LTC = 'LTC',
  XDG = 'XDG',
  WAVES = 'WAVES',
  DASH = 'DASH',
  LINK = 'LINK',
}

export interface Crypto {
  code: CryptoCodes,
  name: string
}

interface CryptoPrice {
  price: string,
  lotVolume: string
}

interface CryptoDaily {
  today: string,
  last24Hours: string
}

export interface CryptoData {
  crypto: {
    code: string,
    name: string
  },
  values: {
    close: CryptoPrice,
    open: CryptoDaily
  }
}