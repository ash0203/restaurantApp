import React, { useEffect, useState,useCallback } from 'react';
import { FlatList, Button,Platform,StyleSheet,View,ActivityIndicator,Text} from 'react-native';
import { useSelector,useDispatch} from 'react-redux';
import * as cartActions from '../../store/actions/cart'
import * as foodsActions from '../../store/actions/foods'
import {HeaderButtons,Item} from 'react-navigation-header-buttons'

import FoodItem from '../../components/shop/FoodItem';
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'

const FoodsOverviewScreen = props => {
  const [isLoading,setIsLoading]=useState(false)
  const [isRefreshing,setIsRefreshing]=useState(false)
  const [error, setError] = useState();
  const foods = useSelector(state => state.foods.availableFoods);
  const dispatch=useDispatch()

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true)
    
    try {
      await dispatch(foodsActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);


  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadProducts
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);


  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(()=>{
      setIsLoading(false)
    });
  }, [dispatch, loadProducts]);


  const selectItemHandler = (id, title) => {
    props.navigation.navigate('FoodDetail', {
      foodId: id,
      foodTitle: title
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && foods.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
    onRefresh={loadProducts}
    refreshing={isRefreshing}
      data={foods}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <FoodItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id,itemData.item.title)
          }}
        >
        <View style={{marginBottom:5}}>
        <Button
        color={Colors.primary}
        title="View Details"
        onPress={() => {
          selectItemHandler(itemData.item.id, itemData.item.title);
        }}
      />
      </View>
      <View style={{marginBottom:5}}>
      <Button
        color={Colors.primary}
        title="To Cart"
        onPress={() => {
          dispatch(cartActions.addToCart(itemData.item));
        }}
      />
      </View>
        </FoodItem>
      )}
    />
  );
};

FoodsOverviewScreen.navigationOptions = navData => {
  return {
  headerTitle: 'FOODSTAGRAM',
  headerLeft:(<HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item iconName={Platform.OS==='android' ? 'md-menu' : 'ios-menu'}
    onPress={()=>{navData.navigation.toggleDrawer()}}/>
    </HeaderButtons>
    ),
  headerRight:(<HeaderButtons HeaderButtonComponent={HeaderButton}>
  <Item iconName={Platform.OS==='android' ? 'md-cart' : 'ios-cart'}
  onPress={()=>{navData.navigation.navigate('Cart')}}/>
  </HeaderButtons>
  )
  }
};
const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default FoodsOverviewScreen;
