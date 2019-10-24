
import axios from 'axios'

export const getFinances = async () => {
    try {

        const res = await axios({
            async: true, // Tää poistaa yhden deprecation-ilmon, ei muuta
            method: 'GET',
            url: '/finances'
        });

        console.log(res)

        if (res.data.status = 'success') {


            // Rahat fronttiin pilkuilla ja €-merkillä
            document.getElementById('ansiotulo').textContent = new Intl.NumberFormat().format(res.data.data.finances[0].ansio.toFixed(2)) + ' €';

            document.getElementById('tulos').textContent = new Intl.NumberFormat().format(res.data.data.finances[0].tulos.toFixed(2)) + ' €';

            document.getElementById('paaoma').textContent = new Intl.NumberFormat().format(res.data.data.finances[0].paaoma.toFixed(2)) + ' €';

            document.getElementById('rahaa').textContent = new Intl.NumberFormat().format(res.data.data.finances[0].rahaa.toFixed(2)) + ' €';

            // Tää toimii ainakin pyöristämään
            // document.getElementById('ansiotulo').textContent = Math.floor(res.data.data.finances[0].ansio) + ' €';
        }

    } catch (err) {
        alert('ERR  🤬 🤬')
    }
}
    ;