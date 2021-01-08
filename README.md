![GitHub Logo](/screenshot.png)

# CryptoGround
A React Native Typescript based project to test some socket functionalities and crypto APIs from Kraken using Redux.
CryptoGround fetches the lates udpates on Cryptocurrency ticks provided by Kraken [Websocket API!](https://docs.kraken.com/websockets/).

List of supported cryptos:
```javascript
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
```
