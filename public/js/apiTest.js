var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
var SCOPE = "https://www.googleapis.com/auth/spreadsheets.readonly";
var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
*  On load, called to load the auth2 library and API client library.
*/
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  fetch("http://app.hookfinland.fi/apitest", {mode: 'cors'}).then((response) => {
      response.json().then((data) => {
      API_KEY = data.API_KEY
      CLIENT_ID = data.CLIENT_ID
  
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPE
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        
          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
        }, function(error) {
          appendPre(JSON.stringify(error, null, 2));
        });
    })
  })
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';

    // HUOM!! Tässä vaiheessa haetaan data eri funktioilla

    haeSheetInfo();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message, num) {
  var pre = document.getElementById('content' + num);
  var textContent = document.createTextNode(message + "\n");
  pre.appendChild(textContent);
}

function haeSheetInfo() {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1CWVgJTW-CYM8ly940mzskTeoyPfXY2_FTLzn4537Wy8',
    range: 'feed!A1:B3',
  }).then(function(response) {
    var range = response.result;
    if (range.values.length > 0) {
      for (i = 0; i < range.values.length; i++) {
        var pre = document.getElementById('content' + i.toString());
        pre.textContent = "";
        var row = range.values[i];
        // Print columns A and E, which correspond to indices 0 and 4.
        appendPre(row[1], i.toString());
      }
    } else {
      var pre = document.getElementById('content');
      pre.textContent = "";
      appendPre('No data found.');
    }
  }, function(response) {
    appendPre('Error: ' + response.result.error.message);
  })
}