
import axios from 'axios'

export const getFinances = async () => {
    try {

        const res = await axios({
            async: true, // Tää poistaa yhden deprecation-ilmon, ei muuta
            method: 'GET',
            url: '/finances'
        });

        if (res.data.status = 'success') {
            console.log(res.data);


        }
    }
    catch (err) {
        alert('ERR  🤬 🤬')
    }
}