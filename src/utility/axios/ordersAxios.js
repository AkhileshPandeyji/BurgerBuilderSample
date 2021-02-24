import axios from 'axios';

const ordersAxios = axios.create({
  baseURL: 'https://burgerbuilder-c54ce-default-rtdb.firebaseio.com',
});

ordersAxios.defaults.headers.post['Content-type'] = 'application/json';

export default ordersAxios;
