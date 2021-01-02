import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { Colors } from '../config/Theme';
import { HomeProps } from '../redux/types/NavigationTypes';
import { RootState } from '../redux/types/StateTypes';
import { openWebsocket, closeWebsocket } from '../redux/actions/WebsocketActions';
import { WebsocketUrl, Icons } from '../config/Const';
import { CryptoPrice } from '../components';
import { CryptoData, CurrencyCodes } from '../redux/types/CryptoTypes';
import CurrencyFormatter from '../utils/CurrencyFormatter';
import { WebsocketParams } from '../redux/types/WebsocketTypes';

const Home = ({ navigation: { setParams }, route: { params: { currency = CurrencyCodes.EUR } } }: HomeProps): JSX.Element => {

  const dispatch = useDispatch();
  const connectionStatus = useSelector(({ socketState }: RootState) => socketState.connectionStatus);
  const cryptoFilter = useSelector(({ socketState }: RootState) => socketState.cryptos.filter);
  const cryptoData = useSelector(({ socketState }: RootState) => socketState.cryptos.data);
  let formatter = new CurrencyFormatter(currency);

  useEffect(() => {

    startConnection();

    return (() => {
      stopConnection();
    });
  }, [cryptoFilter]);

  useEffect(() => {
    setParams({ connectionStatus: connectionStatus });
  }, [connectionStatus]);

  useEffect(() => {

    formatter = new CurrencyFormatter(currency);

    startConnection();

  }, [currency]);

  const startConnection = () => {

    const payload: WebsocketParams = {
      url: WebsocketUrl,
      cryptoFilter: cryptoFilter,
      currency: currency
    };

    dispatch(openWebsocket(payload));
  };

  const stopConnection = () => {
    dispatch(closeWebsocket());
  };

  const CryptoPriceComponent = ({ item }: { item: CryptoData }) => {

    const {
      crypto: { name, code },
      values: { close: { price }, open: { last24Hours } }
    } = item;

    const formattedPrice = formatter.format(price);

    return (
      <CryptoPrice
        key={code}
        close={{
          value: price,
          formatted: formattedPrice
        }}
        open={last24Hours}
        name={name}
        code={code}
        icon={Icons[code]} />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Object.values(cryptoData)}
        renderItem={CryptoPriceComponent}
        keyExtractor={({ crypto: { code } }) => code}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColorWhite
  }
});

export default Home;