export function getYearsFrom(birthDate: string) {
  const timeDiff = Math.abs(Date.now() - new Date(birthDate).getTime());
  return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
}

export function getSimpleDateString(inputDate: string) {
  return new Date(inputDate).toLocaleDateString();
}
