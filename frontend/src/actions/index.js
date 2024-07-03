export function getAllDatesOfMonth(month, year) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dates = [];
  for (let day = 0; day <= daysInMonth; day++) {
    const date = new Date(year, month, day + 1); 
    dates.push(date);
  }
  const monthName = monthNames[month];

  return { dates, monthName };
}

export function convertToMySQLDateFormat(dateString) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}