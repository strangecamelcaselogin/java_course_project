/**
 * Created by Jane on 11.01.2018.
 */
import * as actions from 'actions';


export default function main(state = {

}, action) {
    switch (action.type) {
        case actions.TEMPLATE:
            return {
                ...state,
            };

        default:
            return state
    }
}