/**
 * Created by Jane on 12.01.2018.
 */
import * as actions from '../actions';

export default function boxes(state = {
    boxesById: [],
    notFreeBoxesById: [],
}, action) {
    switch (action.type) {
        case actions.GET_BOXES_RECEIVE:
            return {
                ...state,
                boxesById: action.payload.boxes
            };

        case actions.GET_NOT_FREE_BOXES_RECEIVE:
            return {
                ...state,
                notFreeBoxesById: action.payload.boxes
            };

        case actions.ADD_BOX_RECEIVE: {
            let oldBox = state.boxesById;
            oldBox.push(action.payload);
            return {
                ...state,
                boxesById: oldBox
            };
        }

        case actions.DELETE_BOX_RECEIVE: {
            let oldBox = state.boxesById;
            let deleteIndex = oldBox.indexOf(action.payload);
            oldBox.splice(deleteIndex, 1);
            return {
                ...state,
                boxesById: oldBox
            };
        }

        default:
            return state
    }
}