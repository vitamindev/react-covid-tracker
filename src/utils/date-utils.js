function addDays(date, days) {
  const copy = new Date(Number(date));
  copy.setUTCDate(date.getUTCDate() + days);
  return copy;
}

function addMonths(date, months) {
  const copy = new Date(Number(date));
  copy.setUTCMonth(date.getUTCMonth() + months);
  return copy;
}
export { addDays, addMonths };
