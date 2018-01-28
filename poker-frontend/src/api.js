import axios from 'axios';
import {replace} from 'lodash';


export default {
    user: {
        login: credentials =>
            axios.post('/api/auth', { credentials }).then( res => res.data.user),
        signup: user => 
            axios.post('/api/registrate', { user }).then(res => res.data.user),
        upoloadAvatar: (user) =>
            axios.post('/api/uploadAvatar', { user } ).then(res => res.data.user),
        getUserInfo: (userName) =>
            axios.get(replace('/api/profile/userName', 'userName', userName)).then(res => res.data.user),
    }

}