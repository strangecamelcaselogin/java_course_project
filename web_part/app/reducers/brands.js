/**
 * Created by Jane on 12.01.2018.
 */
import * as actions from '../actions';

export default function brands(state = {
    brandsById: [],
    error: '',
}, action) {
    switch (action.type) {
        case actions.GET_BRANDS_RECEIVE:

            return {
                ...state,
                brandsById: action.payload.brands
            };

        case actions.ADD_BRAND_RECEIVE: {
            let oldBrands = state.brandsById;
            oldBrands.push(action.payload);
            return {
                ...state,
                brandsById: oldBrands
            };
        }

        case actions.ADD_BRAND_RECEIVE_FAIL: {
            return {
                ...state,
                error: action.payload
            };
        }

        case actions.DELETE_BRAND_RECEIVE: {
            let oldBrands = state.brandsById;
            let deleteIndex = oldBrands.indexOf(action.payload);
            oldBrands.splice(deleteIndex, 1);
            return {
                ...state,
                brandsById: oldBrands
            };
        }



        default:
            return state
    }
}