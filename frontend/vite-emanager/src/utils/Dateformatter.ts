export function ymdStrToDmyDate(dateString: string) {
  // console.log("dateString", dateString);
  const parts = dateString.split("-");
  // console.log("parts", parts);
  // parts[0] -> day, parts[1] -> month, parts[2] -> year

  // Note: Months are zero-based in JavaScript's Date object, so we need to subtract 1 from the month
  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]);
  const day = parseInt(parts[2]);
  return new Date(`${year}-${month}-${day}`);
}

export function dmyToYmdString(dateString: string) {
  const parts = dateString.split("-");

  const day = parts[0];
  const month = parts[1];
  const year = parts[2];

  return `${year}-${month}-${day}`;
}
export function ymdToDmyString(dateString: string) {
  const parts = dateString.split("-");

  const year = parts[0];
  const month = parts[1];
  const day = parts[2];
  console.log(`${day}-${month}-${year}`);
  return `${day}-${month}-${year}`;
}

export function formatDateToString(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = String(date.getFullYear());

  return `${day}/${month}/${year}`;
}
export const isValidDate = (date: Date) => !isNaN(date.getTime());

export const isAdult = (date: Date) => {
  const today = new Date();
  // console.log(date.getFullYear());
  const age = today.getFullYear() - date.getFullYear();
  return age >= 18;
};
