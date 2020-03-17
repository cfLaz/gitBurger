import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-f9f4f.firebaseio.com/' //this is where I store stuff (my database)
});
 export default instance;
