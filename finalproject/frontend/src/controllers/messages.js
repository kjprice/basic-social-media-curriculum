import ajax from '../utils/ajax'

const apiEndpoint = 'http://localhost:4001';

export function sendMessage(message) {
    return ajax.post(`${apiEndpoint}/message`, message);
}