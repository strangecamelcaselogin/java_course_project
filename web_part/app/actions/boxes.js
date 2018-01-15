/**
 * Created by Jane on 12.01.2018.
 */
import api from '../api';

//BOXES
export const GET_BOXES_REQUEST = 'GET_BOXES_REQUEST';
export const getBoxesRequest = () => {
    return {
        type: GET_BOXES_REQUEST,
    }
};

export const GET_BOXES_RECEIVE = 'GET_BOXES_RECEIVE';
export function getBoxesReceiveSuccess(boxes) {
    return {
        type: GET_BOXES_RECEIVE,
        payload: {
            boxes
        }
    }
}
export const GET_BOXES_RECEIVE_FAIL = 'GET_BOXES_RECEIVE_FAIL';
export function getBoxesReceiveFailure(error) {
    return {
        type: GET_BOXES_RECEIVE_FAIL,
        error: true,
        payload: error
    }
}

export const GET_BOXES = 'GET_BOXES';
export const getBoxesInfo = () => (dispatch, getState) => {
    dispatch(getBoxesRequest());
    return api.get('/boxes').then(data => {
        dispatch(getBoxesReceiveSuccess(data));
    }).catch(function(error) {
        dispatch(getBoxesReceiveFailure())
    });
};

//not free boxes

export const GET_NOT_FREE_BOXES_REQUEST = 'GET_NOT_FREE_BOXES_REQUEST';
export const getNotFreeBoxesRequest = () => {
    return {
        type: GET_NOT_FREE_BOXES_REQUEST,
    }
};

export const GET_NOT_FREE_BOXES_RECEIVE = 'GET_NOT_FREE_BOXES_RECEIVE';
export function getNotFreeBoxesReceiveSuccess(boxes) {
    return {
        type: GET_NOT_FREE_BOXES_RECEIVE,
        payload: {
            boxes
        }
    }
}
export const GET_NOT_FREE_BOXES_RECEIVE_FAIL = 'GET_NOT_FREE_BOXES_RECEIVE_FAIL';
export function getNotFreeBoxesReceiveFailure(error) {
    return {
        type: GET_NOT_FREE_BOXES_RECEIVE_FAIL,
        error: true,
        payload: error
    }
}

export const GET_NOT_FREE_BOXES = 'GET_NOT_FREE_BOXES';
export const getNotFreeBoxesInfo = () => (dispatch, getState) => {
    dispatch(getNotFreeBoxesRequest());

    return api.get('/clients').then(data => {
        //data.src = require('images/service.png');
        dispatch(getNotFreeBoxesReceiveSuccess([{"id":1,"email":"test","password":"pass"},{"id":2,"email":"test2","password":"pass"},{"id":3,"email":"test3","password":"pass"}]));
    }).catch(function(error) {
        dispatch(getNotFreeBoxesReceiveFailure())
    });
};

//add boxes
export const ADD_BOX_REQUEST = 'ADD_BOX_REQUEST';
export const addBoxRequest = () => {
    return {
        type: ADD_BOX_REQUEST,
    }
};

export const ADD_BOX_RECEIVE = 'ADD_BOX_RECEIVE';
export function addBoxReceiveSuccess(boxes) {
    return {
        type: ADD_BOX_RECEIVE,
        payload: {
            boxes
        }
    }
}
export const ADD_BOX_RECEIVE_FAIL = 'ADD_BOX_RECEIVE_FAIL';
export function addBoxReceiveFailure(error) {
    return {
        type: ADD_BOX_RECEIVE_FAIL,
        error: true,
        payload: error
    }
}

export const ADD_BOX = 'ADD_BOX';
export const addBox = (carBrandId, price) => (dispatch, getState) => {
    dispatch(addBoxRequest());
    return api.post(`/boxes?carBrandId=${carBrandId}&price=${price}`).then(data => {
        dispatch(addBoxReceiveSuccess(data));
    }).catch(function(error) {
        dispatch(addBoxReceiveFailure())
    });
};

//delete boxes
export const DELETE_BOX_REQUEST = 'DELETE_BOX_REQUEST';
export const deleteBoxRequest = () => {
    return {
        type: DELETE_BOX_REQUEST,
    }
};

export const DELETE_BOX_RECEIVE = 'DELETE_BOX_RECEIVE';
export function deleteBoxReceiveSuccess(box_id) {
    return {
        type: DELETE_BOX_RECEIVE,
        payload: box_id
    }
}
export const DELETE_BOX_RECEIVE_FAIL = 'DELETE_BOX_RECEIVE_FAIL';
export function deleteBoxReceiveFailure(error) {
    return {
        type: DELETE_BOX_RECEIVE_FAIL,
        error: true,
        payload: error
    }
}

export const DELETE_BOX = 'DELETE_BOX';
export const deleteBox = (boxId) => (dispatch, getState) => {
    dispatch(deleteBoxRequest());

    return api.delete(`/boxes/${boxId}`).then(data => {
        //data.src = require('images/service.png');
        dispatch(deleteBoxReceiveSuccess(boxId));
    }).catch(function(error) {
        dispatch(deleteBoxReceiveFailure())
    });
};

//inc price box
//delete boxes
export const INC_PRICE_BOX_REQUEST = 'INC_PRICE_BOX_REQUEST';
export const incPriceBoxRequest = () => {
    return {
        type: INC_PRICE_BOX_REQUEST,
    }
};

export const INC_PRICE_BOX_RECEIVE = 'INC_PRICE_BOX_RECEIVE';
export function incPriceBoxReceiveSuccess(box_id) {
    return {
        type: INC_PRICE_BOX_RECEIVE,
        payload: box_id
    }
}
export const INC_PRICE_BOX_RECEIVE_FAIL = 'INC_PRICE_BOX_RECEIVE_FAIL';
export function incPriceBoxReceiveFailure(error) {
    return {
        type: INC_PRICE_BOX_RECEIVE_FAIL,
        error: true,
        payload: error
    }
}

export const INC_PRICE_BOX = 'INC_PRICE_BOX';
export const incPriceBox = (boxId, inc_price) => (dispatch, getState) => {
    dispatch(incPriceBoxRequest());

    return api.patch(`/boxes/${boxId}?price=${inc_price}`).then(data => {
        //data.src = require('images/service.png');
        dispatch(incPriceBoxReceiveSuccess(boxId, inc_price));
    }).catch(function(error) {
        dispatch(incPriceBoxReceiveFailure())
    });
};