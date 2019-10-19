import axios from 'axios'




/// KAIKKI ALLA OLEVA TÄÄLTÄ OHJEESTA: https://medium.com/@pablo127/google-api-authentication-with-oauth-2-on-the-example-of-gmail-a103c897fd98



export const getGoogleURL = async () => {
    try {
        const uri = await window.open(`https://accounts.google.com/o/oauth2/v2/auth?client_id=159039144246-fuu5h5n07b9s525dhefohaaf9fdg9v9h.apps.googleusercontent.com&response_type=code&scope=https://www.googleapis.com/auth/calendar&redirect_uri=http://localhost:5000/&access_type=offline`)


        return uri;


    }
    catch (err) {
        alert(err)
    }
}

//////////////////////////////
/** Tähän pitäs kikkailla nyt kans post sitten jotenkin * */
//////////////////////////////





//////////////////////////////
/** TÄÄ VERSIO TOIMIIII * */
//////////////////////////////


// export const getGoogleUrl = async () => {

//     window.open('https://accounts.google.com/o/oauth2/v2/auth?client_id=159039144246-fuu5h5n07b9s525dhefohaaf9fdg9v9h.apps.googleusercontent.com&response_type=code&scope=https://www.googleapis.com/auth/calendar&redirect_uri=http://localhost:5000/&access_type=offline');

// };



//////////////////////////////
/** TÄÄ VERSIO TOIMIIII * */
//////////////////////////////
