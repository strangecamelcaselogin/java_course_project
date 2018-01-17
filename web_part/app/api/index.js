/**
 * Created by Jane on 11.01.2018.
 */
export default {
    get,
    post,
    put,
    patch,
    'delete': delete_
}

let apiDomain = process.env.API_DOMAIN;
let apiBasePath = process.env.API_BASE_PATH;
if (apiDomain.endsWith('/')) {
    apiDomain = apiDomain.substr(0, apiDomain.length - 1);
}
if (apiBasePath.endsWith('/')) {
    apiBasePath = apiBasePath.substr(0, apiBasePath.length - 1);
}

const API_BASE_URI = apiDomain + apiBasePath;

const METHOD_GET = 'GET';
const METHOD_POST = 'POST';
const METHOD_PUT = 'PUT';
const METHOD_PATCH = 'PATCH';
const METHOD_DELETE = 'DELETE';

const METHODS_WITH_BODY = {
    [METHOD_POST]: true,
    [METHOD_PUT]: true,
    [METHOD_PATCH]: true,
    [METHOD_DELETE]: true
};


function get(...args) {
    return apiRequest(METHOD_GET, ...args);
}

function post(...args) {
    return apiRequest(METHOD_POST, ...args);
}

function put(...args) {
    return apiRequest(METHOD_PUT, ...args);
}

function patch(...args) {
    return apiRequest(METHOD_PATCH, ...args);
}

function delete_(...args) {
    return apiRequest(METHOD_DELETE, ...args);
}


/**
 *
 * @param method
 * @param url
 * @param options
 * example: {
*	contentType:
* 	    'form-data' (для 'application/x-www-form-urlencoded') - по умолч.
*			'json' (для 'application/json'),
*			'plain' (просто)
*	headers: {
*		<любые хедеры>
*	},
*	data: {
*			<любые данные, как JS-объект>
*	}
*
* }
 * @returns {Promise.<TResult>}
 */
function apiRequest(method, url, options = {}) {
    const extraChar = url.startsWith('/') ? '' : '/';
    url = `${API_BASE_URI}${extraChar}${url}`;

    var headers = {...options.headers};

    const contentType = getContentType(options.contentType);
    if (contentType) {
        headers['Content-Type'] = contentType;
    }

    if(localStorage['token']){
        headers['Authorization'] = localStorage['token']
    }

    const fetchOptions = {
        method: method,
        credentials: 'same-origin',
        headers
    };

    if (typeof options.data !== 'undefined') {
        const dataStr = stringifyData(options.data, contentType);
        if (isMethodWithBody(method)) {
            fetchOptions.body = dataStr;
        } else {
            url += `?${dataStr}`;
        }
    }

    return fetch(url, fetchOptions).then(resp => {
        if (resp.ok) {
            console.log(resp['headers'].get('authorization'));
            return resp.json();
        }
        if (resp.status === 401) {
            redirectToLogin();
        }
        if(resp.status === 406) {
            redirectToLogin();
        }
        if(!resp.ok){
            return resp.text().then(e => {
                let codeError = '';
                let text = null;
                try {
                    text = (JSON.parse(e)).error;
                } catch(error) {
                    text = 'Неизвестная ошибка: ' + JSON.parse(error);
                }
                throw Error(text);
            }).catch((error) => {
                throw Error(error);
            });
            //
            //throw Error(e);
        }
    }).then(json => json)
        .catch(error => {
            //console.log(`Ошибка при запросе ${url}: ${error}`);
            throw error;
        });
}

function isMethodWithBody(method) {
    return method in METHODS_WITH_BODY;
}

function getContentType(optionsContentType = 'form-data') {

//services/88b82991-8af4-40d2-8342-50cd30b3d4f8/logo
    switch (optionsContentType) {
        case 'json':
            return 'application/json; charset=UTF-8';
        case 'form-data':
            return 'application/x-www-form-urlencoded; charset=UTF-8';
        case 'multipart':
            //return 'multipart/form-data';
            return 'text/html; charset=UTF-8';
        default:
            throw new TypeError(`Неизвестный тип данных для contentType: ${optionsContentType}`);
    }
}

function stringifyData(data, contentType) {
    if (!contentType) return data;
    if (contentType.includes('json')) {
        return JSON.stringify(data);
    } else if (contentType.includes('form')) {
        return Object.keys(data).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&');
    }
    return data;
}


function redirectToLogin() {
    //window.location = `${LOGIN_PATH}?back=${window.location.href}`;
    window.location = `/login`;
}