'use strict';

const mugModel = require('./mug.schema');

exports.handler = async (event) => {
  const id = event.pathParameters.id;
  const { capacity, color, droppable } = JSON.parse(event.body);
  
  if (!id) {
    return {
      statusCode: 500,
      response: 'An id is required.',
    };
  }  
  
  try {
    let record = {
      capacity,
      color,
      droppable,
    };
    const data = await mugModel.update({'id': id}, record);

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

