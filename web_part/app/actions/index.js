/**
 * Created by Jane on 11.01.2018.
 */
import api from '../api';
export * from './boxes';
export * from './brands';

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
            clients
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
export const getClientsInfo = () => (dispatch, getState) => {
    dispatch(getClientsRequest());
    dispatch(getClientsReceiveSuccess([{"id":1,"email":"test","password":"pass"},{"id":2,"email":"test2","password":"pass"},{"id":3,"email":"test3","password":"pass"}]));

    return api.get('/clients').then(data => {
        //data.src = require('images/service.png');
        dispatch(getClientsReceiveSuccess([{"id":1,"email":"test","password":"pass"},{"id":2,"email":"test2","password":"pass"},{"id":3,"email":"test3","password":"pass"}]));
    }).catch(function(error) {
        dispatch(getClientsReceiveFailure())
    });
};

