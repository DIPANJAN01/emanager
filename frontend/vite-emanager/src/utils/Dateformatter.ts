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
  // console.log(`${day}-${month}-${year}`);
  return `${day}-${month}-${year}`;
}

export function formatDateToString(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = String(date.getFullYear());

  return `${day}/${month}/${year}`;
}
export const isValidDate = (date: Date) => !isNaN(date.getTime());

export const isAdult = (dateOfBirth: Date) => {
  // Create a Date object from the date of birth string
  const dob = new Date(dateOfBirth);

  // Get the current date
  const currentDate = new Date();

  // Calculate the age by subtracting the birth year from the current year
  let age = currentDate.getFullYear() - dob.getFullYear();

  // If the current month is less than the birth month, or if it's the same month but the current day is before the birth day, decrement the age
  if (
    currentDate.getMonth() < dob.getMonth() ||
    (currentDate.getMonth() === dob.getMonth() &&
      currentDate.getDate() < dob.getDate())
  ) {
    age--;
  }

  // Check if the person is 18 years old or older
  return age >= 18;
};
