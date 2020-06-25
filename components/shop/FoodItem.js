import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform,TouchableNativeFeedback } from 'react-native';
import Colors from '../../constants/Colors';

const FoodItem = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.placeItem}>
    <TouchableCmp onPress={props.onSelect}>
      <Image style={styles.image} source={{ uri: props.image }} />
      </TouchableCmp>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.address}>{props.price} Rs</Text>
        </View>
        <View style={styles.buttonContainer}>
            <View style={styles.actions}>
              {props.children}
              </View>
            </View>
    </View>
  );
};

const styles = StyleSheet.create({
  placeItem: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: Platform.OS==='ios' ? 30 : 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: Platform.OS==='ios' ? 70 : 60,
    height: Platform.OS==='ios' ? 70 : 60,
    borderRadius: Platform.OS==='ios' ? 35 : 30,
    backgroundColor: '#ccc',
    borderColor: Colors.primary,
    borderWidth: 1
  },
  infoContainer: {
    marginLeft: Platform.OS==='ios' ? 35 : 15,
    width:Platform.OS==='ios'? 150 : 130,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex:1
  },
  title: {
    color: 'black',
    fontSize: 18,
    marginBottom: 5
  },
  price: {
    color: '#666',
    fontSize: 16
  },
  buttonContainer:{
    alignItems:'flex-end',
  },
  actions:{
    marginBottom:5
  }
});

export default FoodItem;