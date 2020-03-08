export const getDuration = (durationInMilisecons: number): string => {
  const date: Date = new Date(durationInMilisecons);
  return `${date.getMinutes()}:${date.getSeconds()}`;
};
