'use strict';

const mugModel = require('./mug.schema');

exports.handler = async (event) => {
  const id = event.pathParameters.id;
  
  if (!id) {
    return {
      statusCode: 500,
      response: 'An id is required.',
    };
  }  
  
  try {
    const data = await mugModel.delete({'id': id});
    console.log('______DELETED_______:', data);
    return {
      statusCode: 200,
      body: 'This mug no longer exists. You murderer!!!',
    };
  } catch (error) {
    console.log('_____ERROR_____', error);
    return {
      statusCode: 500,
      response: error.message,
    };
  }

};