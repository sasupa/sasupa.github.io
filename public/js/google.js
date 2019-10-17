import axios from 'axios'

export const getGoogleUrl = async () => {
    try {
        const res = await axios({
            async: true, // Tää poistaa yhden deprecation-ilmon, ei muuta
            method: 'GET',
            url: 'google',
            data: {
                res
            }
        });

    }
    catch (err) {
        alert('error logout')
    }
}