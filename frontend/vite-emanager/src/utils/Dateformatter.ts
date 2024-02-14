export function createDateFromFormat(dateString: string) {
  const parts = dateString.split("-");
  // parts[0] -> day, parts[1] -> month, parts[2] -> year

  // Note: Months are zero-based in JavaScript's Date object, so we need to subtract 1 from the month
  const year = parseInt(parts[2]);
  const month = parseInt(parts[1]) - 1;
  const day = parseInt(parts[0]);

  return new Date(year, month, day);
}

export function formatDateToString(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = String(date.getFullYear());

  return `${day}/${month}/${year}`;
}
export const isValidDate = (date) => !isNaN(date.getTime());

export const isAdult = (date) => {
  const today = new Date();
  const age = today.getFullYear() - date.getFullYear();
  date.setFullYear(today.getFullYear());
  return age >= 18 && date <= today;
};
