import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Card;
