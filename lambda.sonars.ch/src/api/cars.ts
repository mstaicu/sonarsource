import type { APIGatewayProxyHandler } from "aws-lambda";

import { reduceByMake, getAverageAutonomyForMake } from "../handler/cars";

const handler: APIGatewayProxyHandler = async (event) => {
  var response = await fetch(
    "https://data.wa.gov/api/views/f6w7-q2d2/rows.json"
  );
  var payload = await response.json();

  var pathParams = event.pathParameters || {};
  var requestedCarMake = pathParams["make"];

  if (requestedCarMake) {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        make: requestedCarMake,
        autonomy: getAverageAutonomyForMake(payload.data, requestedCarMake),
      }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(reduceByMake(payload.data)),
  };
};

module.exports.handler = handler;
