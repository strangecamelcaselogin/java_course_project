/**
 * Created by Jane on 11.01.2018.
 */
import { combineReducers } from 'redux';
import main from './main';
import clients from './clients';
import brands from './brands';
import boxes from './boxes';
import client from './client';
import rents from './rents';


const rootReducer = combineReducers({
    main,
    clients,
    boxes,
    brands,
    client,
    rents
});

export default rootReducer