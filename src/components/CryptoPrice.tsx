import React, { memo } from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ImageProps
} from 'react-native';

import { Colors } from '../config/Theme';
import { getGrowth } from '../utils/CryptoUtils';

interface Props {
  name: string;
  code: string;
  close: {
    value: string,
    formatted: string
  };
  open: string;
  icon: ImageProps;
}

const CryptoPrice = ({ name, code, close, open, icon }: Props): JSX.Element => {

  const growth = getGrowth(open, close.value);

  return (
    <TouchableOpacity style={styles.container}
      activeOpacity={.8}>

      <View style={styles.details}>

        <View style={styles.icon}>
          <Image
            style={styles.icon}
            resizeMode='contain'
            source={icon} />
        </View>

        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.pair}>{code}</Text>
        </View>
      </View>

      <View style={styles.values}>
        <Text style={styles.price}>
          {close.formatted}
        </Text>
        <Text style={growth.startsWith('-') ? styles.negativeGrowth : styles.positiveGrowth}>{growth}%</Text>
      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 68,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.backgroundColorWhiteLighter,
    marginHorizontal: 12,
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 12
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  values: {
    alignItems: 'flex-end'
  },
  name: {
    fontSize: 23,
    color: Colors.text
  },
  pair: {
    color: Colors.textHint
  },
  price: {
    fontSize: 23,
    color: Colors.text
  },
  positiveGrowth: {
    color: Colors.green
  },
  negativeGrowth: {
    color: Colors.red
  }
});

const areEqual = (prevProps: Props, nextProps: Props): boolean => {
  const { close: { value: prevClosePrice } } = prevProps;
  const { close: { value: nextClosePrice } } = nextProps;

  return prevClosePrice === nextClosePrice;
};

export default memo(CryptoPrice, areEqual);