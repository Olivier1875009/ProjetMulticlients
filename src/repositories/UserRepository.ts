import { inject } from "vue";
import { AxiosStatic } from 'axios';

export class UserRepository {
    axios = inject('axios') as AxiosStatic;

    public async login(user: string, password: string) {
        try {
            const data = {
                username: user,
                password: password
            };

            const response = await this.axios.post('http://localhost:3001/connexion', data);
            if (response.status === 200) {
                return response.data
            }
        } catch (err) {
            console.error('Erreur de connexion', err);
        }


    }
    public async CreateAccount(email: string, user: string, password: string) {

        try {
            const data = {
                email: email,
                username: user,
                password: password
            };
            const response = await this.axios.post('http://localhost:3001/explorers', data);
            if (response.status === 201) {
                return response.data
            }
        } catch (err) {
            console.error('Erreur de connexion', err);
        }




    }

    public async logout(token: string | null) {
        try {
            const response = await this.axios.post('http://localhost:27017/explorers/actions/logout', { 'Authorization': token });
            
            if (response.status === 200) {
                return response.data
            }
        } catch (err) {
            console.error('Erreur de connexion', err);
        }
    }

    public async retrieveOne(idUser: string, token: string) {
        try {
            const res = await this.axios.get(`http://localhost:27017/explorers/${idUser}`, { headers: { 'Authorization': token } } );

            if (res.status === 200) {
                return res.data;
            }
        } catch (err) {
            throw err;
        }
    }
}