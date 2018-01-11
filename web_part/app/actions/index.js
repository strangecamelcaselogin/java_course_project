/**
 * Created by Jane on 11.01.2018.
 */
import api from 'api';

export const TEMPLATE = 'TEMPLATE';
export const enterTemplate = (path) => {

    return {
        type: TEMPLATE,
        payload: {
            path
        }
    }
};