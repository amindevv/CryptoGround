import { StackScreenProps } from '@react-navigation/stack';
import { ConnectionStatus } from './WebsocketTypes';
import { CurrencyCodes } from './CryptoTypes';

type RootStackParamList = {
  HOME: {
    currency: CurrencyCodes,
    connectionStatus: ConnectionStatus
  };
};

export type HomeProps = StackScreenProps<RootStackParamList, 'HOME'>