import axios from 'axios'

export const getGoogleUrl = async () => {
    try {
        const res = await axios({
            async: true, // Tää poistaa yhden deprecation-ilmon, ei muuta
            method: 'GET',
            url: 'users/logout'
        });

        if (res.data.status = 'success') {
            // location.reload(true)
            alert("Logged out successfully!");
            window.setTimeout(() => {
                location.assign("/");
            }, 1000);

        }
    }
    catch (err) {
        alert('error logout')
    }
}