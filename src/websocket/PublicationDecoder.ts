import { WsSubscriptionSuccess, WsSubscriptionFailure, WsTicker } from '../redux/types/WebsocketTypes';
import { isRight } from 'fp-ts/Either';

export const isSubscribedSuccess = (message: JSON): boolean => {
  return isRight(WsSubscriptionSuccess.decode(message));
};

export const isSubscribedFailure = (message: JSON): boolean => {
  return isRight(WsSubscriptionFailure.decode(message));
};

export const isTicker = (message: JSON): boolean => {
  return isRight(WsTicker.decode(message));
};
