module.exports = function verifyAge(day, month, year) {
  //month is zero index based
  const birthDate = new Date(year, month - 1, day);
  const ageInMs = Date.now() - birthDate.getTime();
  const eighteenYearsInMs = 18 * 365.25 * 24 * 60 * 60 * 1000;
  if (ageInMs >= eighteenYearsInMs) return true;
  else return false;
};
