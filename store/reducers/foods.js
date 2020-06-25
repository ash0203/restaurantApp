import PRODUCTS from '../../data/dummy-data';
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS } from '../actions/foods';
import Food from '../../models/food';

const initialState = {
    availableFoods: [],
    userFoods: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                availableFoods: action.products,
                userFoods: action.userProducts
            };
        case CREATE_PRODUCT:
            const newProduct = new Food(
                action.productData.id,
                action.productData.ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price
            );
            return {
                ...state,
                availableFoods: state.availableFoods.concat(newProduct),
                userFoods: state.userFoods.concat(newProduct)
            };
        case UPDATE_PRODUCT:
            const productIndex = state.userFoods.findIndex(
                prod => prod.id === action.pid
            );
            const updatedProduct = new Food(
                action.pid,
                state.userFoods[productIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                state.userFoods[productIndex].price
            );
            const updatedUserProducts = [...state.userFoods];
            updatedUserProducts[productIndex] = updatedProduct;
            const availableProductIndex = state.availableFoods.findIndex(
                prod => prod.id === action.pid
            );
            const updatedAvailableProducts = [...state.availableFoods];
            updatedAvailableProducts[availableProductIndex] = updatedProduct;
            return {
                ...state,
                availableFoods: updatedAvailableProducts,
                userFoods: updatedUserProducts
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                userFoods: state.userFoods.filter(
                    product => product.id !== action.pid
                ),
                availableFoods: state.availableFoods.filter(
                    product => product.id !== action.pid
                ),
            };
    }
    return state;
};