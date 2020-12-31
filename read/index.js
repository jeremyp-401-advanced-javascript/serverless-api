'use strict';

const mugModel = require('./mug.schema');

exports.handler = async (event) => {
  console.log('___EVENT___', event);
  const id = event.pathParameters.id;

  try {
    let data;
    // Check for an id
    if (id) { // If there is...
      const list = await mugModel.query('id').eq(id).limit(1).exec();
      data = list;
    } else { // If there isn't...
      data = await mugModel.scan().exec();
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.log('_____ERROR_____', error);
    return {
      statusCode: 500,
      response: error.message,
    };
  }
};