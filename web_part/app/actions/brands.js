/**
 * Created by Jane on 12.01.2018.
 */
import api from '../api';


//BRANDS
export const GET_BRANDS_REQUEST = 'GET_BRANDS_REQUEST';
export const getBrandsRequest = () => {
    return {
        type: GET_BRANDS_REQUEST,
    }
};

export const GET_BRANDS_RECEIVE = 'GET_BRANDS_RECEIVE';
export function getBrandsReceiveSuccess(brands) {
    return {
        type: GET_BRANDS_RECEIVE,
        payload: {
            brands
        }
    }
}
export const GET_BRANDS_RECEIVE_FAIL = 'GET_BRANDS_RECEIVE_FAIL';
export function getBrandsReceiveFailure(error) {
    return {
        type: GET_BRANDS_RECEIVE_FAIL,
        error: true,
        payload: error
    }
}

export const GET_BRANDS = 'GET_BRANDS';
export const getBrandsInfo = () => (dispatch, getState) => {
    dispatch(getBrandsRequest());
    dispatch(getBrandsReceiveSuccess(['Lada', 'Renault', 'Toyota']));

    return api.get('/clients').then(data => {
        //data.src = require('images/service.png');
        dispatch(getBrandsReceiveSuccess([{"id":1,"email":"test","password":"pass"},{"id":2,"email":"test2","password":"pass"},{"id":3,"email":"test3","password":"pass"}]));
    }).catch(function(error) {
        dispatch(getBrandsReceiveFailure())
    });
};


//add brands
export const ADD_BRAND_REQUEST = 'ADD_BRAND_REQUEST';
export const addBrandRequest = () => {
    return {
        type: ADD_BRAND_REQUEST,
    }
};

export const ADD_BRAND_RECEIVE = 'ADD_BRAND_RECEIVE';
export function addBrandReceiveSuccess(brand) {
    return {
        type: ADD_BRAND_RECEIVE,
        payload: brand
    }
}
export const ADD_BRAND_RECEIVE_FAIL = 'ADD_BRAND_RECEIVE_FAIL';
export function addBrandReceiveFailure(error) {
    return {
        type: ADD_BRAND_RECEIVE_FAIL,
        error: true,
        payload: error
    }
}

export const ADD_BRAND = 'ADD_BRAND';
export const addBrand = () => (dispatch, getState) => {
    dispatch(addBrandRequest());
    dispatch(addBrandReceiveSuccess('Kia'));

    return 0; /*api.post('/clients').then(data => {
        //data.src = require('images/service.png');
        dispatch(addBrandReceiveSuccess([{"id":1,"email":"test","password":"pass"},{"id":2,"email":"test2","password":"pass"},{"id":3,"email":"test3","password":"pass"}]));
    }).catch(function(error) {
        dispatch(addBrandReceiveFailure())
    });*/
};


//delete brands
export const DELETE_BRAND_REQUEST = 'DELETE_BRAND_REQUEST';
export const deleteBrandRequest = () => {
    return {
        type: DELETE_BRAND_REQUEST,
    }
};

export const DELETE_BRAND_RECEIVE = 'DELETE_BRAND_RECEIVE';
export function deleteBrandReceiveSuccess(brand) {
    return {
        type: DELETE_BRAND_RECEIVE,
        payload: brand
    }
}
export const DELETE_BRAND_RECEIVE_FAIL = 'DELETE_BRAND_RECEIVE_FAIL';
export function deleteBrandReceiveFailure(error) {
    return {
        type: DELETE_BRAND_RECEIVE_FAIL,
        error: true,
        payload: error
    }
}

export const DELETE_BRAND = 'DELETE_BRAND';
export const deleteBrand = () => (dispatch, getState) => {
    dispatch(deleteBrandRequest());
    dispatch(deleteBrandReceiveSuccess('Toyota'));

    return api.delete('/clients').then(data => {
        //data.src = require('images/service.png');
        dispatch(deleteBrandReceiveSuccess([{"id":1,"email":"test","password":"pass"},{"id":2,"email":"test2","password":"pass"},{"id":3,"email":"test3","password":"pass"}]));
    }).catch(function(error) {
        dispatch(deleteBrandReceiveFailure())
    });
};