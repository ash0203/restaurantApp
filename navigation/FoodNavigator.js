import React from 'react';
import { createAppContainer,createSwitchNavigator,DrawerItems } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import { createDrawerNavigator } from 'react-navigation-drawer';
import { useDispatch } from 'react-redux';

import FoodsOverviewScreen from '../screens/shop/FoodsOverviewScreen';
import FoodDetailScreen from '../screens/shop/FoodDetailScreen';
import Colors from '../constants/Colors';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserFoodsScreen from '../screens/user/UserFoodsScreen';
import EditFoodScreen from '../screens/user/EditFoodScreen';
import SearchScreen from '../screens/shop/SearchScreen';
import ResultScreen from '../screens/shop/ResultScreen'
import StartupScreen from '../screens/StartupScreen'
import AuthScreen from '../screens/user/AuthScreen'
import * as authActions from '../store/actions/auth';

const defaultNavOptions={
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

const FoodNavigator = createStackNavigator(
  {
    FoodsOverview: FoodsOverviewScreen,
    FoodDetail: FoodDetailScreen,
    Cart:CartScreen,
  },
  {  navigationOptions:{
    drawerIcon:drawerConfig=>(<Ionicons name={Platform.OS==='android' ? 'md-cart' : 'ios-cart'}
    size={23}
    color={drawerConfig.tintColor}/>
    )
  },
    defaultNavigationOptions: defaultNavOptions
  }
);

const OrdersNavigator=createStackNavigator({
  Orders:OrdersScreen
},{
  navigationOptions:{
    drawerIcon:drawerConfig=>(<Ionicons name={Platform.OS==='android' ? 'md-list' : 'ios-list'}
    size={23}
    color={drawerConfig.tintColor}/>
    )
  },
  defaultNavigationOptions:defaultNavOptions
})

const AdminNavigator=createStackNavigator({
  UserFoods:UserFoodsScreen,
  EditFoods:EditFoodScreen
},{
  navigationOptions:{
    drawerIcon:drawerConfig=>(<Ionicons name={Platform.OS==='android' ? 'md-create' : 'ios-create'}
    size={23}
    color={drawerConfig.tintColor}/>
    )
  },
  defaultNavigationOptions:defaultNavOptions
})

const SearchNavigator=createStackNavigator({
  Search:SearchScreen,
  Result:ResultScreen
},{
  navigationOptions:{
    drawerIcon:drawerConfig=>(<Ionicons name={Platform.OS==='android' ? 'md-search' : 'ios-search'}
    size={23}
    color={drawerConfig.tintColor}/>
    )
  },
  defaultNavigationOptions:defaultNavOptions
})

const ShopNavigator = createDrawerNavigator(
  {
    Food: FoodNavigator,
    Search:SearchNavigator,
    Orders: OrdersNavigator,
    Admin:AdminNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItems {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
                //props.navigation.navigate('Auth');
              }}
            />
          </SafeAreaView>
        </View>
      );
    }
  }
);

const AuthNavigator = createStackNavigator({
  Auth:AuthScreen
},{
  defaultNavigationOptions:defaultNavOptions
})

const MainNavigator = createSwitchNavigator({
  Start:StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator

})


export default createAppContainer(MainNavigator);
