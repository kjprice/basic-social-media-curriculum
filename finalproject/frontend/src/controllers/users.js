import ajax from '../utils/ajax'

export function signUp(username, password) {
    return ajax.post('/signUp', {username, password});
}

export function signIn(username, password) {
    return ajax.post('/signIn', {username, password});
}

export function logout() {
    return ajax.post('/logout');
}

export function getLoggedInUser() {
    return ajax.get('/loggedInUser');
}