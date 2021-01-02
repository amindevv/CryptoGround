import { Dispatch } from 'redux';
import { WebsocketParams } from '../redux/types/WebsocketTypes';
import { removeData, updateData, updateStatus } from '../redux/actions/WebsocketActions';
import { ConnectionStatus } from '../redux/types/WebsocketTypes';
import { isSubscribedFailure, isTicker } from './PublicationDecoder';
import { WsSubscriptionFailure } from '../redux/types/WebsocketTypes';
import { cryptoDataFromMessage, getCodeFromPair } from '../utils/CryptoUtils';

export default class CryptoWebsocket {

  private reconnectIntervalInMillis = 10000;

  private websocket: WebSocket | null = null;
  private reconnectionInterval: NodeJS.Timeout | null = null;

  connect = (dispatch: Dispatch, payload: WebsocketParams): void => {
    this.disconnect();

    const { url } = payload;

    this.websocket = new WebSocket(url);

    this.websocket.onopen = () => this.handleOpen(dispatch, payload);
    this.websocket.onclose = () => this.handleClose(dispatch);
    this.websocket.onerror = () => this.handleError(dispatch, payload);
    this.websocket.onmessage = (message: WebSocketMessageEvent) => this.handleMessage(dispatch, message);
  }

  disconnect = (): void => {
    this.websocket?.close();
  }

  sendMessage = (message: string): void => {
    this.websocket?.send(message);
  }

  private handleOpen = (dispatch: Dispatch, payload: WebsocketParams) => {
    dispatch(updateStatus(ConnectionStatus.CONNECTED));
    this.clearReconnectInterval();

    this.subscribeToPairs(payload);
  }

  private handleClose = (dispatch: Dispatch) => {
    dispatch(updateStatus(ConnectionStatus.DISCONNECTED));
  }

  private handleError = (dispatch: Dispatch, payload: WebsocketParams) => {
    if (this.reconnectionInterval === null) {

      dispatch(updateStatus(ConnectionStatus.DISCONNECTED));

      this.reconnectionInterval = setInterval(() => {

        this.connect(dispatch, payload);

      }, this.reconnectIntervalInMillis);
    }
  }

  private handleMessage = (distpatch: Dispatch, messageEvent: WebSocketMessageEvent) => {

    if (messageEvent.data !== undefined) {

      const message = JSON.parse(messageEvent.data);

      if (isSubscribedFailure(message)) {

        const event = message as WsSubscriptionFailure;
        const cryptoCode = getCodeFromPair(event.pair);
        distpatch(removeData(cryptoCode));
      } else if (isTicker(message)) {

        const cryptoData = cryptoDataFromMessage(message);
        distpatch(updateData(cryptoData));
      }
    }
  }

  private clearReconnectInterval = () => {
    if (this.reconnectionInterval) {
      clearInterval(this.reconnectionInterval);
    }
  }

  private subscribeToPairs = ({ cryptoFilter, currency }: WebsocketParams) => {

    const pairs = cryptoFilter.map((crypto) => {
      return `${crypto.code}/${currency}`;
    });

    const subscriptionMessage = {
      event: 'subscribe',
      subscription: {
        name: 'ticker'
      },
      pair: pairs
    };

    this.sendMessage(JSON.stringify(subscriptionMessage));
  }
}