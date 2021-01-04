'use strict';

// Testing Requirements

// Assert the following

//     The correct status codes and returned data for each REST route
//         Create a record using POST
//         Read a list of records using GET
//         Read a record using GET
//         Update a record using PUT
//         Destroy a record using DELETE

let apiBaseUrl = 'https://ghpr8nzqbd.execute-api.us-west-2.amazonaws.com';
const superagent = require('superagent');
let mugId; // Set this globally so we can reuse it in our tests.

describe('The mug routes', () => {
  // Create a record using POST
  it('correctly posts a new mug', async () => {
    const postObject = { 'capacity': 350, 'color': ['Slate Grey', 'Blellow', 'Yellow'], 'droppable': false };
    const response = await superagent.post(`${apiBaseUrl}/mug`).send(postObject);
    let responseBody = JSON.parse(response.text);
    mugId = responseBody.id;
    expect(response).toHaveProperty('status', 200);
    expect(responseBody).toStrictEqual({ 'id': mugId, 'capacity': 350, 'color': ['Slate Grey', 'Blellow', 'Yellow'], 'droppable': false });
  });
  // Read a list of records using GET (All)
  it('returns all mug records', async () => {
    const response = await superagent.get(`${apiBaseUrl}/mug/`);
    let responseBody = JSON.parse(response.text);
    expect(response).toHaveProperty('status', 200);
    expect(typeof responseBody).toEqual('object');
  });
  // Read a record using GET
  it('returns a specific mug by id', async () => {
    const response = await superagent.get(`${apiBaseUrl}/mug/${mugId}`);
    let responseBody = JSON.parse(response.text);
    expect(response).toHaveProperty('status', 200);
    expect(responseBody).toStrictEqual([{ 'id': mugId, 'capacity': 350, 'color': ['Slate Grey', 'Blellow', 'Yellow'], 'droppable': false }]);
  });
  // Update a record using PUT
  it('correctly updates a new mug', async () => {
    const putObject = { 'capacity': 350, 'color': ['Slate Grey', 'Blellow', 'Yellow'], 'droppable': false };
    const response = await superagent.put(`${apiBaseUrl}/mug/${mugId}`).send(putObject);
    let responseBody = JSON.parse(response.text);
    expect(response).toHaveProperty('status', 200);
    expect(responseBody).toStrictEqual({ 'id': mugId, 'capacity': 350, 'color': ['Slate Grey', 'Blellow', 'Yellow'], 'droppable': false });
  });
  // Destroy a record using DELETE
  it('correctly deletes a mug', async () => {
    const response = await superagent.delete(`${apiBaseUrl}/mug/${mugId}`);
    expect(response).toHaveProperty('status', 200);
  });
});
