/**
 * Created by Jane on 16.01.2018.
 */
import * as actions from '../actions';
import _ from 'lodash';

export default function client(state = {
    client: null,
    clientCarList: [],
    clientListTicket: [],
}, action) {
    switch (action.type) {
        case actions.GET_CLIENT:
            return {
                ...state,
                client: action.payload.client
            };
        case actions.GET_CLIENT_CARS_RECEIVE:
            return {
                ...state,
                clientCarList: action.payload
            };

        case actions.ADD_CLIENT_CAR_RECEIVE: {
            let oldCarList = _.cloneDeep(state.clientCarList);
            oldCarList.push(action.payload);
            return {
                ...state,
                clientCarList: oldCarList
            };
        }

        case actions.DELETE_CLIENT_CAR_RECEIVE: {
            let carList = _.cloneDeep(state.clientCarList);

            let index = null;
            for (let i = 0; i < carList.length; i++){
                let car = carList[i];
                if (car.id === +action.payload){
                    index = i;
                    console.log('oldCarList', index);
                    break;
                }
            }

            carList.splice(index, 1);
            return {
                ...state,
                clientCarList: carList
            };
        }
        default:
            return state
    }
}