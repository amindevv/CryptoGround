import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {View, StyleSheet, Text} from 'react-native';

const Splash = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ad5389', '#3c1053']}
        style={styles.background}
      />

      <Text>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
});

export default Splash;
