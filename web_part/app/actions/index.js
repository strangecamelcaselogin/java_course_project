/**
 * Created by Jane on 11.01.2018.
 */
import api from '../api';
export * from './boxes';
export * from './brands';
export * from './cars'
export * from './rent'

export const TEMPLATE = 'TEMPLATE';
export const enterTemplate = (path) => {

    return {
        type: TEMPLATE,
        payload: {
            path
        }
    }
};

export const CLIENTS_RECEIVE_FAIL = 'CLIENTS_RECEIVE_FAIL';
export function clientsReceiveFailure(error) {
    return {
        type: CLIENTS_RECEIVE_FAIL,
        error: true,
        payload: error
    }
}


export const CLIENTS_REQUEST = 'CLIENTS_REQUEST';
export const clientsRequest = client => {
    return {
        type: CLIENTS_REQUEST,
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

export const GET_CLIENTS = 'GET_CLIENTS';
export const getClientsInfo = () => (dispatch, getState) => {
    dispatch(clientsRequest());

    return api.get('/clients').then(data => {
        //data.src = require('images/service.png');
        dispatch(getClientsReceiveSuccess(data));
    }).catch(function(error) {
        dispatch(clientsReceiveFailure())
    });
};



//get clients with brand
export const GET_CLIENTS_WITH_BRAND_RECEIVE = 'GET_CLIENTS_WITH_BRAND_RECEIVE';
export function getClientsWithBrandReceiveSuccess(clients) {
    return {
        type: GET_CLIENTS_WITH_BRAND_RECEIVE,
        payload: {
            clients
        }
    }
}

export const GET_CLIENTS_WITH_BRAND = 'GET_CLIENTS_WITH_BRAND';
export const getClientsWithBrand = (brandId) => (dispatch, getState) => {
    dispatch(clientsRequest());

    return api.get(`clients/with_brand/${brandId}`).then(data => {
        //data.src = require('images/service.png');
        console.log('getClientsWithBrand', data);
        dispatch(getClientsWithBrandReceiveSuccess(data));
    }).catch(function(error) {
        dispatch(clientsReceiveFailure())
    });
};


//get clients with end rent date

export const GET_CLIENTS_WITH_END_RENT_RECEIVE = 'GET_CLIENTS_WITH_END_RENT_RECEIVE';
export function getClientsWithEndRentReceiveSuccess(clients) {
    return {
        type: GET_CLIENTS_WITH_END_RENT_RECEIVE,
        payload: {
            clients
        }
    }
}

export const GET_CLIENTS_WITH_END_RENT = 'GET_CLIENTS_WITH_END_RENT';
export const getClientsWithEndRent = () => (dispatch, getState) => {
    dispatch(clientsRequest());

    return api.get('/clients').then(data => {
        //data.src = require('images/service.png');
        dispatch(getClientsWithBrandReceiveSuccess(data));
    }).catch(function(error) {
        dispatch(clientsReceiveFailure())
    });
};



// CLIENT //

export const GET_CLIENT_RECEIVE = 'GET_CLIENT_RECEIVE';
export function getClientReceiveSuccess(client) {
    return {
        type: GET_CLIENT_RECEIVE,
        payload: {
            client
        }
    }
}

export const GET_CLIENT = 'GET_CLIENT';
export const getClient = () => (dispatch, getState) => {
    dispatch(clientsRequest());

    return api.get('/clients/me').then(data => {
        //data.src = require('images/service.png');
        dispatch(getClientReceiveSuccess(data));
    }).catch(function(error) {
        dispatch(clientsReceiveFailure())
    });
};

//get client with box
export const GET_CLIENT_WITH_BOX_RECEIVE = 'GET_CLIENT_WITH_BOX_RECEIVE';
export function getClientWithBoxReceiveSuccess(client) {
    return {
        type: GET_CLIENT_WITH_BOX_RECEIVE,
        payload: {
            client
        }
    }
}

export const GET_CLIENT_WITH_BOX = 'GET_CLIENT_WITH_BOX';
export const getClientWithBox = () => (dispatch, getState) => {
    dispatch(clientsRequest());

    return api.get('/clients').then(data => {
        //data.src = require('images/service.png');
        dispatch(getClientWithBoxReceiveSuccess(data));
    }).catch(function(error) {
        dispatch(clientsReceiveFailure())
    });
};

//get client tickets
export const GET_CLIENT_TICKETS_RECEIVE = 'GET_CLIENT_TICKETS_RECEIVE';
export function getClientTicketsReceiveSuccess(tickets) {
    return {
        type: GET_CLIENT_TICKETS_RECEIVE,
        payload: {
            tickets
        }
    }
}

export const GET_CLIENT_TICKETS = 'GET_CLIENT_TICKETS';
export const getClientTickets = () => (dispatch, getState) => {
    dispatch(clientsRequest());

    return api.get('/clients').then(data => {
        //data.src = require('images/service.png');
        dispatch(getClientTicketsReceiveSuccess(data));
    }).catch(function(error) {
        dispatch(clientsReceiveFailure())
    });
};


