export const getDuration = (durationInMilisecons: number): string => {
  const date: Date = new Date(durationInMilisecons);
  return `${date.getMinutes()}:${date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()}`;
};
