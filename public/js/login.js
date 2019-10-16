/* eslint-disable */
import axios from 'axios'

export const login = async (email, password) => {
    try {
        const res = await axios({
            async: true, // Tää poistaa yhden deprecation-ilmon, ei muuta
            method: 'POST',
            url: 'users/login',
            data: {
                email,
                password,

            }
        });

        if (res.data.status === 'success') {
            alert("Logged in successfully!");
            window.setTimeout(() => {
                location.assign("/dashboard");
            }, 1000);
        }

    }
    catch (err) {
        alert(err.response.data.message)
    }
}



export const logout = async () => {
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