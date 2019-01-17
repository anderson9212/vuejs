import axios from 'axios';

const urlBase = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/';

export default {
    localidades: (id, callback) => {
        let localidade_id = '';

        if(id) {
            localidade_id = id + '/municipios';
        }
        
        const url = urlBase + localidade_id;
        axios.get(url).then((localidade) => {
            if (callback) {
                callback(localidade);
            }
        })
    }
}