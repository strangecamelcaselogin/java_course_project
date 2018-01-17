/**
 * Created by Jane on 17.01.2018.
 */
import * as actions from '../actions';
import _ from 'lodash';

export default function brands(state = {
    rentsList: [],
    error: '',
}, action) {
    switch (action.type) {
        case actions.GET_CLIENT_RENTS_RECEIVE:

            return {
                ...state,
                rentsList: action.payload
            };

        case actions.ADD_CLIENT_RENT_RECEIVE: {
            let oldBrands = _.cloneDeep(state.brandsById);
            oldBrands.push(action.payload);
            return {
                ...state,
                rentsList: oldBrands
            };
        }

        case actions.DELETE_CLIENT_RENT_RECEIVE: {
            let oldRents =  _.cloneDeep(state.rentsList);
            let index = null;
            for (let i = 0; i < oldRents.length; i++){
                let rent = oldRents[i];

                if (rent.id === +action.payload){
                    index = i;
                    console.log('oldBrands', index, rent.id, action.payload );
                    break;
                }
            }
            oldRents.splice(index, 1);
            return {
                ...state,
                rentsList: oldBrands
            };
        }

        default:
            return state
    }
}