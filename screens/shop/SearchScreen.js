import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Button, Platform, StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/cart'
import * as foodsActions from '../../store/actions/foods'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { SearchBar } from 'react-native-elements';



import FoodItem from '../../components/shop/FoodItem';
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'

const SearchScreen = props => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState();
    const [state, setState] = useState({})
    const foods = useSelector(state => state.foods.availableFoods);
    const dispatch = useDispatch()

    const loadProducts = useCallback(async () => {
        setIsLoading(true);
        try {
            await dispatch(foodsActions.fetchProducts());
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
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
        loadProducts();
    }, [dispatch, loadProducts]);


    const SearchFilterFunction = (text) => {
        //passing the inserted text in textinput
        const newData = foods.filter(function (item) {
            //applying filter for the inserted text in search bar
            const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        setState({
            dataSource: newData,
            search: text,
            clear: ''
        });
    }

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('FoodDetail', {
            foodId: id,
            foodTitle: title
        });
    };
    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }



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

    return (
        <>
            <SearchBar
                containerStyle={{
                    backgroundColor: 'transparent',
                    borderBottomColor: 'transparent',
                    borderTopColor: 'transparent',
                }}
                inputContainerStyle={{
                    backgroundColor: '#EDEDED'
                }}
                inputStyle={{
                    backgroundColor: '#EDEDED',
                    borderRadius: 10,
                    color: 'black'
                }}
                searchIcon={{ size: 34 }}
                value={state.search}
                onChangeText={text => SearchFilterFunction(text)}
                onClear={text => {SearchFilterFunction("")}}
                placeholder="Search"
               
            />
            <FlatList
                data={state.dataSource}
                renderItem={itemData => (
                    <FoodItem
                        image={itemData.item.imageUrl}
                        title={itemData.item.title}
                        price={itemData.item.price}
                        onSelect={() => {
                            selectItemHandler(itemData.item.id, itemData.item.title)
                        }}
                    >
                        <View style={{ marginBottom: 5 }}>
                            <Button
                                color={Colors.primary}
                                title="To Cart"
                                onPress={() => {
                                    dispatch(cartActions.addToCart(itemData.item));
                                }}
                            />
                        </View>
                    </FoodItem>)}
                keyExtractor={(item, index) => index.toString()}
            />
        </>
    );
};

SearchScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Search',
        headerLeft: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => { navData.navigation.toggleDrawer() }} />
        </HeaderButtons>
        ),
    }
};
const styles = StyleSheet.create({
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default SearchScreen;