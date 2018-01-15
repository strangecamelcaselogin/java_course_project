/**
 * Created by Jane on 12.01.2018.
 */
import * as actions from '../actions';
import _ from 'lodash';

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
            let oldBrands = _.cloneDeep(state.brandsById);
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
            let oldBrands =  _.cloneDeep(state.brandsById);
            let index = null;
            for (let i = 0; i < oldBrands.length; i++){
                let brand = oldBrands[i];
                if (brand.id === action.payload){
                    index = i;
                    break;
                }
            }
            oldBrands.splice(index, 1);
            return {
                ...state,
                brandsById: oldBrands
            };
        }

        default:
            return state
    }
}