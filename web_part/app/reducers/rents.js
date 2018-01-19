/**
 * Created by Jane on 17.01.2018.
 */
import * as actions from '../actions';
import _ from 'lodash';

export default function rents(state = {
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
            let oldRents = _.cloneDeep(state.rentsList);
            oldRents.push(action.payload);
            return {
                ...state,
                rentsList: oldRents
            };
        }

        case actions.CANCEL_CLIENT_RENT_RECEIVE: {
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
                rentsList: oldRents
            };
        }

        default:
            return state
    }
}