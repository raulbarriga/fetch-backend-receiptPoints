import moment from "moment";

/*
These rules collectively define how many points should be awarded to a receipt.

- One point for every alphanumeric character in the retailer name.

- 50 points if the total is a round dollar amount with no cents.

- 25 points if the total is a multiple of 0.25.

- 5 points for every two items on the receipt.

- If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.

- 6 points if the day in the purchase date is odd.

- 10 points if the time of purchase is after 2:00pm and before 4:00pm.
*/

const calculatePoints = (receipt) => {
  let points = 0;
  const alphanumericRegex = /[a-zA-Z0-9]/g;
  const roundDollarRegex = /^\d+\.00$/;

  // calculate alphanumeric characters

  // One point for every alphanumeric character in the retailer name.
  const matches = receipt.retailer.match(alphanumericRegex);
  points += matches ? matches.length : 0;
  console.log("points: ", points);

  // 50 points if the total is a round dollar amount with no cents.
  if (roundDollarRegex.test(receipt.total)) points += 50;
  console.log("+50 points: ", points);

  // 25 points if the total is a multiple of 0.25.
  // convert the string total to a floating-point number
  const value = parseFloat(receipt.total);
  if (value % 0.25 === 0) points += 25;
  console.log("+25 points: ", points);

  // 5 points for every two items on the receipt.
  if (receipt.items.length > 0) {
    const pairPoints = 5;
    const totalPairs = Math.floor(receipt.items.length / 2);
    const totalPoints = totalPairs * pairPoints;
    points += totalPoints;
    console.log("+5 for every 2 items points: ", points);
  }

  // If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
  receipt.items.forEach((item) => {
    // trimmed length
    const trimmedLength = item.shortDescription.trim().length;
    if (trimmedLength % 3 === 0)
      points += Math.ceil(parseFloat(item.price) * 0.2);
  });
  console.log("points after forEach: ", points);

  // 6 points if the day in the purchase date is odd.
  const purchaseDay = moment(receipt.purchaseDate).utc().date();
  if (purchaseDay % 2 !== 0) {
    points += 6;
    console.log("+6 points for odd day: ", points);
  }

  // 10 points if the time of purchase is after 2:00pm and before 4:00pm.
  const purchaseHour = parseInt(receipt.purchaseTime.split(":")[0], 10);
  console.log("purchaseHour: ", purchaseHour);
  // 14 is 2pm, 16 is 4pm
  if (purchaseHour >= 14 && purchaseHour < 16) {
    points += 10;
    console.log("+10 points: ", points);
  }

  return points;
};

export default calculatePoints;
