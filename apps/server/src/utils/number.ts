export function getRandomIntInclusive(
  minimum: number,
  maximum: number
): number {
  const minCeiled = Math.ceil(minimum);
  const maxFloored = Math.floor(maximum);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}
