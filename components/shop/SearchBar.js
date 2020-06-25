import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons'

const SearchBar = ({ term, onTermChange, onTermSubmit }) => {
  return (
    <View style={styles.backgroundStyle}>
      <Feather name="search" style={styles.iconStyle} />
      <TextInput
        value={term}
        onChangeText={newTerm => onTermChange(newTerm)}
        autoCapitalize="none"
        style={styles.inputStyle}
        autoCorrect={false}
        placeholder="Search"
        onEndEditing={() => onTermSubmit()}
      />
    </View>
  );
};

const styles = StyleSheet.create(
  {
    backgroundStyle: {
      marginTop: 10,
      backgroundColor: '#F0EEEE',
      height: 50,
      borderRadius: 5,
      marginHorizontal: 15,
      flexDirection: 'row',
      marginBottom: 10
    },
    inputStyle: {
      flex: 1,
      fontSize: 18
    },
    iconStyle: {
      padding: 10,
      fontSize: 30

    }


  });

export default SearchBar;