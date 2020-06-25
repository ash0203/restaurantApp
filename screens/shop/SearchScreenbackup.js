import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Button
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector,useDispatch} from 'react-redux';
import * as foodsActions from '../../store/actions/foods'

import HeaderButton from '../../components/UI/HeaderButton';
import SearchBar from '../../components/shop/SearchBar'
import { FlatList } from 'react-native-gesture-handler';



const SearchScreen = props => {
    const [term, setTerm] = useState('');
    const foods = useSelector(state => state.foods.availableFoods);
    return (<View>
        <SearchBar
            term={term}
            onTermChange={newTerm => setTerm(newTerm)}
            onTermSubmit={() => { }} />

            <FlatList
            data={foods}
            renderItem={itemData=><Text style={{padding:20,fontSize:20}}>{itemData.item.title}</Text>}
            keyExtractor={(item,index)=>index.toString()}
            />


    </View>);
};

SearchScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Search Screen',
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
    };
};

const styles = StyleSheet.create({});


export default SearchScreen;
