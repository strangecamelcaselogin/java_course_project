/**
 * Created by Jane on 12.01.2018.
 */
import * as actions from '../actions';
import _ from 'lodash';

export default function boxes(state = {
    boxesById: [],
    freeBoxesById: [],
}, action) {
    switch (action.type) {
        case actions.GET_BOXES_RECEIVE:
            return {
                ...state,
                boxesById: action.payload.boxes
            };

        case actions.GET_FREE_BOXES_RECEIVE:
            return {
                ...state,
                freeBoxesById: action.payload
            };

        case actions.ADD_BOX_RECEIVE: {
            let oldBox = _.cloneDeep(state.boxesById);
            oldBox.push(action.payload.boxes);
            return {
                ...state,
                boxesById: oldBox
            };
        }

        case actions.DELETE_BOX_RECEIVE: {
            let oldBoxes = _.cloneDeep(state.boxesById);
            let index = null;
            for (let i = 0; i < oldBoxes.length; i++){
                let box = oldBoxes[i];
                if (box.id === +action.payload){
                    index = i;
                    break;
                }
            }
            oldBoxes.splice(index, 1);
            return {
                ...state,
                boxesById: oldBoxes
            };
        }

        default:
            return state
    }
}