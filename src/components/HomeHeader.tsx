import { StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';
import { CurrencyCodes } from '../redux/types/CryptoTypes';
import { HomeProps } from '../redux/types/NavigationTypes';
import ChangeCurrency from './ChangeCurrency';
import ConnectionStatusIndicator from './ConnectionStatusIndicator';

const HeaderHome = ({ navigation: { setParams }, route: { params } }: HomeProps, defaultCurrency: CurrencyCodes): StackNavigationOptions => {

  const onSelectedChange = (code: string) => {
    setParams({ currency: code as CurrencyCodes });
  };

  const options: StackNavigationOptions = ({
    headerRight: () => {
      return (
        <ChangeCurrency
          defaultValue={defaultCurrency}
          onSelectedChange={onSelectedChange}
        />
      );
    },
    headerLeft: () => {
      return (
        <ConnectionStatusIndicator
          status={params.connectionStatus}
        />
      );
    }
  });

  return options;
};

export default HeaderHome;