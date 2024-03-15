import { reduceByMake, getAverageAutonomyForMake } from "./cars";

import response from "../data/cars.json";

test("for a given car make, return the number of cars under that make", () => {
  // @ts-ignore
  var reducedByMake = reduceByMake(response.data);
  expect(reducedByMake["TESLA"]).toBe(79659);
});

test("for a given car make, return the ", () => {
  // @ts-ignore
  expect(Math.trunc(getAverageAutonomyForMake(response.data, "TESLA"))).toBe(
    240
  );
});
