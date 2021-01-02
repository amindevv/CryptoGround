import React from 'react';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { CurrencyCodes } from '../redux/types/CryptoTypes';
import { Currencies } from '../config/Const';

interface Props {
  defaultValue: CurrencyCodes;
  onSelectedChange: (code: string) => void
}

const ChangeCurrency = ({
  defaultValue,
  onSelectedChange
}: Props): JSX.Element => {

  return (
    <DropDownPicker
      containerStyle={styles.container}
      defaultValue={defaultValue}
      items={Currencies}
      onChangeItem={({ value }) => onSelectedChange(value)}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 120,
    marginRight: 12
  }
});

export default ChangeCurrency;
