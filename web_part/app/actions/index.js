/**
 * Created by Jane on 11.01.2018.
 */
import api from 'api';

export const TEMPLATE = 'TEMPLATE';
export const enterTemplate = (path) => {

    return {
        type: TEMPLATE,
        payload: {
            path
        }
    }
};


export const GET_CLIENTS_REQUEST = 'GET_CLIENTS_REQUEST';
export const getClientsRequest = client => {
    return {
        type: GET_CLIENTS_REQUEST,
        payload: {
            client
        }
    }
};

export const GET_CLIENTS_RECEIVE = 'GET_CLIENTS_RECEIVE';
export function getClientsReceiveSuccess(clients) {
    return {
        type: GET_CLIENTS_RECEIVE,
        payload: {
            client
        }
    }
}
export const GET_CLIENTS_RECEIVE_FAIL = 'GET_CLIENTS_RECEIVE_FAIL';
export function getClientsReceiveFailure(error) {
    return {
        type: GET_CLIENTS_RECEIVE_FAIL,
        error: true,
        payload: error
    }
}

export const GET_CLIENTS = 'GET_CLIENTS';
export const getClients = () => (dispatch, getState) => {
    dispatch(getClientsRequest());
    return api.get('/clients').then(data => {
        //data.src = require('images/service.png');
        dispatch(getClientsReceiveSuccess(data));
    }).catch(function(error) {
        dispatch(getClientsReceiveFailure())
    });
};