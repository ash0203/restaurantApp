import React from 'react';
import { FlatList, Button, Platform,Alert,View, StyleSheet,Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import FoodItem from '../../components/shop/FoodItem';
import Colors from '../../constants/Colors';
import * as foodsActions from '../../store/actions/foods';

const UserFoodsScreen = props => {
    const userFoods = useSelector(state => state.foods.userFoods);
    const dispatch = useDispatch();

    const editProductHandler = id => {
        props.navigation.navigate('EditFoods', { FoodId: id });
    };


    const deleteHandler = (id) => {
        Alert.alert('Are you sure','Do you really want to delete this item',[{
            text:'no',style:'default'},{text:'yes',style:'destructive',
            onPress:()=>{dispatch(foodsActions.deleteProduct(id))}
            }])

    }

    if(userFoods.length === 0){
        return <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
        <Text> No Food found </Text>
        </View>
    }


    return (
        <FlatList
            data={userFoods}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <FoodItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => { editProductHandler(itemData.item.id); }}
                >
                    <View style={styles.editButton}>
                    <Button color={Colors.primary} title="Edit" onPress={() => {
                        editProductHandler(itemData.item.id);
                    }} />
                    </View>
                    <View  style={styles.editButton}>
                    <Button
                        color={Colors.primary}
                        title="Delete"
                        onPress={deleteHandler.bind(this,itemData.item.id)}
                    />
                    </View>
                </FoodItem>
            )}
        />
    );
};

UserFoodsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Foods',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Add"
                    iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                    onPress={() => {
                        navData.navigation.navigate('EditFoods');
                    }}
                />
            </HeaderButtons>
        )
    };
};

const styles=StyleSheet.create({
   editButton: {
       marginBottom:5,
       paddingLeft:30}
})

export default UserFoodsScreen;