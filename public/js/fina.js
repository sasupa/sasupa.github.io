
import axios from 'axios'

export const getFinances = async () => {
    try {

        const res = await axios({
            async: true, // Tää poistaa yhden deprecation-ilmon, ei muuta
            method: 'GET',
            url: '/finances'
        });

        console.log(res)

        if (res.data.status = 'success')
            document.getElementById('ansiotulo').textContent = Math.floor(res.data.data.finances[0].ansio) + ' €';
        document.getElementById('tulos').textContent = Math.floor(res.data.data.finances[0].tulos) + ' €';
        document.getElementById('paaoma').textContent = Math.floor(res.data.data.finances[0].paaoma) + ' €';
        document.getElementById('rahaa').textContent = Math.floor(res.data.data.finances[0].rahaa) + ' €';

    }
    catch (err) {
        alert('ERR  🤬 🤬')
    }
}