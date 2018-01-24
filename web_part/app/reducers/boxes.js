/**
 * Created by Jane on 12.01.2018.
 */
import * as actions from '../actions';
import _ from 'lodash';

export default function boxes(state = {
    boxesList: [],
    freeBoxesById: [],
}, action) {
    switch (action.type) {
        case actions.GET_BOXES_RECEIVE:
            return {
                ...state,
                boxesList: action.payload.boxes
            };

        case actions.GET_FREE_BOXES_RECEIVE:
            return {
                ...state,
                freeBoxesById: action.payload
            };

        case actions.ADD_BOX_RECEIVE: {
            let oldBox = _.cloneDeep(state.boxesList);
            oldBox.push(action.payload.boxes);
            let oldFreeBox = _.cloneDeep(state.freeBoxesById);
            oldFreeBox.push(action.payload.boxes);
            return {
                ...state,
                boxesList: oldBox,
                freeBoxesById: oldFreeBox
            };
        }

        case actions.DELETE_BOX_RECEIVE: {
            let oldBoxes = _.cloneDeep(state.boxesList);
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
                boxesList: oldBoxes
            };
        }

        case actions.INC_PRICE_BOX_RECEIVE: {
            let oldBoxes = _.cloneDeep(state.boxesList);
            let boxId = action.payload.box_id;
            let price = action.payload.price;

            for (let i = 0; i < oldBoxes.length; i++){
                let box = oldBoxes[i];
                if (box.id === boxId){
                    box.price = price;
                    break;
                }
            }
            return {
                ...state,
                boxesList: oldBoxes
            };
        }

        default:
            return state
    }
}