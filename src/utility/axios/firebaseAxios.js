import axios from 'axios';

const signUpInstance = axios.create({
  baseURL:
    'https://identitytoolkit.googleapis.com/v1',
});

signUpInstance.defaults.headers.post['Content-type'] = 'application/json';
export default signUpInstance;
