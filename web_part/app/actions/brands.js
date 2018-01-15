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

    return api.get('/car_brands').then(data => {
        console.log('getBrandsInfo', data);
        dispatch(getBrandsReceiveSuccess(data));
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
export const addBrand = (car_brand) => (dispatch, getState) => {
    dispatch(addBrandRequest());
    //parameters: name (query)
    return api.post(`/car_brands?name=${car_brand}`).then(data => {
        //data.src = require('images/service.png');
        dispatch(addBrandReceiveSuccess(data));
    }).catch(function(error) {
        dispatch(addBrandReceiveFailure())
    });
};


//delete brands
export const DELETE_BRAND_REQUEST = 'DELETE_BRAND_REQUEST';
export const deleteBrandRequest = () => {
    return {
        type: DELETE_BRAND_REQUEST,
    }
};

export const DELETE_BRAND_RECEIVE = 'DELETE_BRAND_RECEIVE';
export function deleteBrandReceiveSuccess(brandId) {
    return {
        type: DELETE_BRAND_RECEIVE,
        payload: brandId
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
export const deleteBrand = (carBrandId) => (dispatch, getState) => {
    dispatch(deleteBrandRequest());

    return api.delete(`/car_brands?id=${carBrandId}`).then(data => {
        //data.src = require('images/service.png');
        dispatch(deleteBrandReceiveSuccess(carBrandId));
    }).catch(function(error) {
        dispatch(deleteBrandReceiveFailure())
    });
};