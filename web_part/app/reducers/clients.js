/**
 * Created by Jane on 11.01.2018.
 */
import * as actions from '../actions';

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
            return {
                ...state,
                brandsClients: action.payload.clients
            };

        case actions.GET_CLIENTS_WITH_END_RENT_RECEIVE:
            return {
                ...state,
                endRentsClients: action.payload.clients
            };

        case actions.GET_CLIENT:
            return {
                ...state,
                client: action.payload.client
            };

        case actions.GET_CLIENT_WITH_BOX_RECEIVE:
            return {
                ...state,
                boxClient: action.payload.client
            };

        case actions.GET_CLIENT_CARS_RECEIVE:
            return {
                ...state,
                clientCarList: action.payload.cars
            };

        case actions.GET_CLIENT_TICKETS_RECEIVE:
            return {
                ...state,
                clientListTicket: action.payload.tickets
            };

        case actions.ADD_CLIENT_CAR_RECEIVE: {
            let oldCarList = state.clientCarList;
            oldCarList.push(action.payload);
            return {
                ...state,
                clientCarList: oldCarList
            };
        }

        case actions.DELETE_CLIENT_CAR_RECEIVE: {
            let oldCarList = state.clientCarList;
            let deleteIndex = oldCarList.indexOf(action.payload);
            oldCarList.splice(deleteIndex, 1);
            return {
                ...state,
                clientCarList: oldCarList
            };
        }

        default:
            return state
    }
}