export const getCurrentTimeFormatted = (): string => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const milliseconds = currentTime.getMilliseconds();
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};
