import ajax from '../utils/ajax'

export function signUp(userInfo) {
    return ajax.post('/signUp', userInfo);
}

export function signIn(email, password) {
    return ajax.post('/signIn', {email, password});
}

export function logout() {
    return ajax.post('/logout');
}

export function getLoggedInUser() {
    return ajax.get('/loggedInUser');
}