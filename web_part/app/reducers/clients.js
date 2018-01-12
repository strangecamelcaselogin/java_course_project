/**
 * Created by Jane on 11.01.2018.
 */
import * as actions from '../actions';

export default function clients(state = {
    clients: [],
    brandsClients: [],
    endRentsClients: [],
    boxClient: [],
}, action) {
    switch (action.type) {
        case actions.GET_CLIENTS_RECEIVE:
            return {
                ...state,
                clients: action.payload.clients
            };



        default:
            return state
    }
}