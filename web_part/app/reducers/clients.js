/**
 * Created by Jane on 11.01.2018.
 */
import * as actions from '../actions';
import _ from 'lodash';

export default function clients(state = {
    clients: [],
    brandsClients: [],
    endRentsClients: [],
    boxClient: {},
    client: {},
    clientCarList: [],
    clientListTicket: []
}, action) {
    switch (action.type) {
        case actions.GET_CLIENTS_RECEIVE:
            return {
                ...state,
                clients: action.payload.clients
            };

        case actions.GET_CLIENTS_WITH_BRAND_RECEIVE:
            console.log('GET_CLIENTS_WITH_BRAND_RECEIVE', action.payload.clients);
            return {
                ...state,
                brandsClients: action.payload.clients
            };

        case actions.GET_CLIENTS_WITH_END_RENT_RECEIVE:
            return {
                ...state,
                endRentsClients: action.payload.clients
            };

        case actions.GET_CLIENT_WITH_BOX_RECEIVE:
            return {
                ...state,
                boxClient: action.payload.client
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
            let oldCarList = _.cloneDeep(state.clientCarList);
            let index = null;
            for (let i = 0; i < oldCarList.length; i++){
                let car = oldCarList[i];
                if (car.id === action.payload){
                    index = i;
                    break;
                }
            }
            oldCarList.splice(index, 1);
            return {
                ...state,
                clientCarList: oldCarList
            };
        }

        default:
            return state
    }
}