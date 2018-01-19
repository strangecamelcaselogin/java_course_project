/**
 * Created by Jane on 17.01.2018.
 */

import api from '../api';

export const CLIENT_RENT_RECEIVE_FAIL = 'CLIENT_RENT_RECEIVE_FAIL';
export function clientRentReceiveFailure(error) {
    return {
        type: CLIENT_RENT_RECEIVE_FAIL,
        error: true,
        payload: error
    }
}


export const CLIENT_RENT_REQUEST = 'CLIENT_RENT_REQUEST';
export const clientRentRequest = rent => {
    return {
        type: CLIENT_RENT_REQUEST,
        payload: {
            rent
        }
    }
};

export const GET_CLIENT_RENTS_RECEIVE = 'GET_CLIENT_RENTS_RECEIVE';
export function getClientRentsReceiveSuccess(rents) {
    return {
        type: GET_CLIENT_RENTS_RECEIVE,
        payload: rents
    }
}

export const GET_CLIENT_RENTS = 'GET_CLIENT_RENTS';
export const getClientRentsInfo = () => (dispatch, getState) => {
    dispatch(clientRentRequest());

    return api.get('/rents').then(data => {
        //data.src = require('images/service.png');
        dispatch(getClientRentsReceiveSuccess(data));
    }).catch(function(error) {
        dispatch(clientRentReceiveFailure())
    });
};

//add RENT
export const ADD_CLIENT_RENT_RECEIVE = 'ADD_CLIENT_RENT_RECEIVE';
export function addClientRentReceiveSuccess(rent) {
    return {
        type: ADD_CLIENT_RENT_RECEIVE,
        payload: rent
    }
}

export const ADD_CLIENT_RENT = 'ADD_CLIENT_RENT';
export const addClientRent = (carId, end) => (dispatch, getState) => {
    dispatch(clientRentRequest());

    return api.post(`/rents?carId=${carId}&end=${end}`).then(data => {
        //data.src = require('images/service.png');
        dispatch(addClientRentReceiveSuccess(data));
    }).catch(function(error) {
        dispatch(clientRentReceiveFailure())
    });
};

//delete RENT
//add RENT
export const CANCEL_CLIENT_RENT_RECEIVE = 'CANCEL_CLIENT_RENT_RECEIVE';
export function cancelClientRentReceiveSuccess(rentId) {
    return {
        type: CANCEL_CLIENT_RENT_RECEIVE,
        payload: rentId
    }
}

export const CANCEL_CLIENT_RENT = 'CANCEL_CLIENTS_RENT';
export const cancelClientRent = (rentId) => (dispatch, getState) => {
    dispatch(clientRentRequest());

    return api.patch(`/rents/${rentId}`).then(data => {
        //data.src = require('images/service.png');
        dispatch(cancelClientRentReceiveSuccess(rentId));
    }).catch(function(error) {
        dispatch(clientRentReceiveFailure())
    });
};