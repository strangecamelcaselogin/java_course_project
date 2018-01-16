/**
 * Created by Jane on 16.01.2018.
 */
import api from '../api';

export const CLIENT_CAR_RECEIVE_FAIL = 'CLIENT_CAR_RECEIVE_FAIL';
export function clientCarReceiveFailure(error) {
    return {
        type: CLIENT_CAR_RECEIVE_FAIL,
        error: true,
        payload: error
    }
}


export const CLIENT_CAR_REQUEST = 'CLIENT_CAR_REQUEST';
export const clientCarRequest = client => {
    return {
        type: CLIENT_CAR_REQUEST,
        payload: {
            client
        }
    }
};

export const GET_CLIENT_CARS_RECEIVE = 'GET_CLIENT_CARS_RECEIVE';
export function getClientCarsReceiveSuccess(cars) {
    return {
        type: GET_CLIENT_CARS_RECEIVE,
        payload: cars
    }
}

export const GET_CLIENT_CARS = 'GET_CLIENT_CARS';
export const getClientCarsInfo = () => (dispatch, getState) => {
    dispatch(clientCarRequest());

    return api.get('/cars').then(data => {
        //data.src = require('images/service.png');
        dispatch(getClientCarsReceiveSuccess(data));
    }).catch(function(error) {
        dispatch(clientCarReceiveFailure())
    });
};

//add car
export const ADD_CLIENT_CAR_RECEIVE = 'ADD_CLIENT_CAR_RECEIVE';
export function addClientCarReceiveSuccess(car) {
    return {
        type: ADD_CLIENT_CAR_RECEIVE,
        payload: car
    }
}

export const ADD_CLIENT_CAR = 'ADD_CLIENT_CAR';
export const addClientCar = (number, brandId) => (dispatch, getState) => {
    dispatch(clientCarRequest());

    return api.post(`/cars?number=${number}&carBrandId=${brandId}`).then(data => {
        //data.src = require('images/service.png');
        dispatch(addClientCarReceiveSuccess(data));
    }).catch(function(error) {
        dispatch(clientCarReceiveFailure())
    });
};

//delete car
//add car
export const DELETE_CLIENT_CAR_RECEIVE = 'DELETE_CLIENT_CAR_RECEIVE';
export function deleteClientCarReceiveSuccess(carId) {
    return {
        type: DELETE_CLIENT_CAR_RECEIVE,
        payload: carId
    }
}

export const DELETE_CLIENT_CAR = 'DELETE_CLIENTS_CAR';
export const deleteClientCar = (carId) => (dispatch, getState) => {
    dispatch(clientCarRequest());

    return api.delete(`/cars/${carId}`).then(data => {
        //data.src = require('images/service.png');
        dispatch(deleteClientCarReceiveSuccess(carId));
    }).catch(function(error) {
        dispatch(clientCarReceiveFailure())
    });
};