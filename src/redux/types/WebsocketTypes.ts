import { Crypto, CryptoData, CurrencyCodes } from './CryptoTypes';
import * as D from 'io-ts/Decoder';
import { pipe } from 'fp-ts/lib/function';

// Actions Types
export const WS_OPEN = 'WS_OPEN';
export const WS_CLOSE = 'WS_CLOSE';
export const WS_UPDATE_STATUS = 'WS_UPDATE_STATUS';
export const WS_UPDATE_DATA = 'WS_UPDATE_DATA';
export const WS_REMOVE_DATA = 'WS_REMOVE_DATA';

// Payloads
export enum ConnectionStatus {
  CONNECTED = 0,
  DISCONNECTED = 1
}

export interface WebsocketParams {
  url: string,
  cryptoFilter: Array<Crypto>,
  currency: CurrencyCodes
}

// Actions
export interface ActionOpenWebsocket {
  type: typeof WS_OPEN;
  payload: WebsocketParams
}

export interface ActionCloseWebsocket {
  type: typeof WS_CLOSE;
  payload: undefined
}

export interface ActionWsUpdateStatus {
  type: typeof WS_UPDATE_STATUS,
  payload: {
    status: ConnectionStatus
  }
}

export interface ActionUpdateData {
  type: typeof WS_UPDATE_DATA,
  payload: {
    cryptoData: CryptoData
  }
}

export interface ActionRemoveData {
  type: typeof WS_REMOVE_DATA,
  payload: {
    cryptoCode: string
  }
}

export type ActionWebSocket =
  ActionOpenWebsocket |
  ActionCloseWebsocket |
  ActionWsUpdateStatus |
  ActionUpdateData |
  ActionRemoveData

// Decoders
const WsSubscription = D.type({
  event: D.string,
  pair: D.string,
  status: D.string,
});

export const WsSubscriptionSuccess = pipe(
  WsSubscription,
  D.intersect(
    D.type({
      status: D.literal('subscribed')
    })
  )
);

export const WsSubscriptionFailure = pipe(
  WsSubscription,
  D.intersect(
    D.type({
      status: D.literal('error')
    })
  )
);

const PriceWholeLotVolume = D.tuple(D.string, D.number, D.string);
const PriceLotVolume = D.tuple(D.string, D.string);
const Today = D.tuple(D.number, D.number);

const Ticker = D.type({
  a: PriceWholeLotVolume,
  b: PriceWholeLotVolume,
  c: PriceLotVolume,
  h: PriceLotVolume,
  l: PriceLotVolume,
  o: PriceLotVolume,
  p: PriceLotVolume,
  t: Today,
  v: PriceLotVolume,
});

export const WsTicker = D.tuple(D.number, Ticker, D.string, D.string);

export type WsSubscriptionSuccess = D.TypeOf<typeof WsSubscriptionSuccess>
export type WsSubscriptionFailure = D.TypeOf<typeof WsSubscriptionFailure>
export type WsTicker = D.TypeOf<typeof WsTicker>

export type WsMessage = WsSubscriptionSuccess | WsSubscriptionFailure | WsTicker

