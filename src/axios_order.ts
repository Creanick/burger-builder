import axios from 'axios';

const instance = axios.create({
    baseURL: "https://burger-builder-83a7b-default-rtdb.firebaseio.com/"
});

export default instance;