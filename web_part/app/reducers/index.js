/**
 * Created by Jane on 11.01.2018.
 */
import { combineReducers } from 'redux';
import main from './main';
import clients from './clients';
import brands from './brands';
import boxes from './boxes';


const rootReducer = combineReducers({
    main,
    clients,
    boxes,
    brands
});

export default rootReducer