// Täällä pitäs testailla että miten saadaan vaikka ensin vaan jostain
// APIsta sataa konsoliin

gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: 1CWVgJTW-CYM8ly940mzskTeoyPfXY2_FTLzn4537Wy8,
    range: Sheet1!A1:B2
  }).then((response) => {
    var result = response.result;
    var numRows = result.values ? result.values.length : 0;
    console.log(`${numRows} rows retrieved.`);
  });