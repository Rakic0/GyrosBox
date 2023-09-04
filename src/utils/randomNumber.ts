export default function getRandomNumber({
  min,
  max,
  diff,
}: {
  min: number;
  max: number;
  diff: number;
}) {
  const randomNumbers: number[] = [];

  // Generate the first random number
  randomNumbers.push(
    Math.floor(min + Math.random() * (max - min - 2 * diff)) + min
  );

  // Generate the second random number
  randomNumbers.push(
    randomNumbers[0] +
      diff +
      Math.floor(Math.random() * (max - randomNumbers[0] - diff + 1))
  );

  // Generate the third random number
  randomNumbers.push(
    randomNumbers[1] +
      diff +
      Math.floor(Math.random() * (max - randomNumbers[1] - diff + 1))
  );

  return randomNumbers;
}
