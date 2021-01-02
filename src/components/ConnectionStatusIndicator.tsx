import React from 'react';

import {
  View,
  StyleSheet
} from 'react-native';

import { Colors } from '../config/Theme';
import { ConnectionStatus } from '../redux/types/WebsocketTypes';

const ConnectionStatusIndicator = ({ status }: { status: ConnectionStatus }): JSX.Element => {

  return (
    <View
      style={StyleSheet.flatten([
        styles.container, {
          backgroundColor: status === ConnectionStatus.CONNECTED ? Colors.green : Colors.red
        }])} />
  );
};

const styles = StyleSheet.create({
  container: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: 12
  }
});

export default ConnectionStatusIndicator;