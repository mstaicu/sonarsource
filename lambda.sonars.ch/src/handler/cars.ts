export var reduceByMake = (data: any[][]) =>
  data.reduce((accumulator: any, row) => {
    var make = row[14];

    accumulator[make] ? accumulator[make]++ : (accumulator[make] = 1);

    return accumulator;
  }, {});

export var getAverageAutonomyForMake = (data: any[][], make: string) => {
  var filterElectricCars = data.filter(
    (row) =>
      row[16] === "Battery Electric Vehicle (BEV)" &&
      row[17] !== "Eligibility unknown as battery range has not been researched"
  );

  var filterCarMake = filterElectricCars.filter((row) => row[14] === make);

  if (filterCarMake.length === 0) {
    return 0;
  }

  var totalElectricRange = filterCarMake.reduce(
    (acc, row) => acc + parseFloat(row[18]),
    0
  );

  return totalElectricRange / filterCarMake.length;
};
