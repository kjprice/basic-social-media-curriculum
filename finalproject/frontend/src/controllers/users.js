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

export function getUsers() {
    return ajax.get('/users')
}

export function getFriends() {
    return ajax.get('/friends')
}

export function addFriend(userId) {
    return ajax.put('/friend', {userId});
}