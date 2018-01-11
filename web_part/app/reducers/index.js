/**
 * Created by Jane on 11.01.2018.
 */
import { combineReducers } from 'redux';
import main from './main';
import clients from './clients';


const rootReducer = combineReducers({
    main,
    clients,
});

export default rootReducer