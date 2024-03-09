/** ********************************************************************************************
 *                                                                                             *
 * Please read the following tutorial before implementing tasks:                               *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date       *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#date_object *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl       *
 *                                                                                             *
 ********************************************************************************************* */

/**
 * By the passed date returns the number of seconds elapsed since 00:00 01.01.1970.
 *
 * @param {string} date - date and time.
 * @return {number} milliseconds in timestamp.
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 0
 * '04 Dec 1995 00:12:00 UTC' => 818035920000
 */
function dateToTimestamp(date) {
  return Date.parse(date);
}

/**
 * Returns the time in hh:mm:ss format from the received date.
 *
 * @param {Date} date - date.
 * @return {string} time in hh:mm:ss format.
 *
 * @example:
 * Date(2023, 5, 1, 8, 20, 55) => '08:20:55'
 * Date(2015, 10, 20, 23, 15, 1) => '23:15:01'
 */
function getTime(date) {
  const hour =
    date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
  const seconds =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : `${date.getSeconds()}`;

  return `${hour}:${minutes}:${seconds}`;
}

/**
 * Returns the name of the day of the week for a given date string.
 *
 * @param {string} date - date and time.
 * @return {string} the name of the day of the week
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 'Thursday'
 * '03 Dec 1995 00:12:00 UTC' => 'Sunday'
 * '2024-01-30T00:00:00.000Z' => 'Tuesday'
 */
function getDayName(date) {
  const day = new Date(date);
  const numOfDay = day.getDay();
  let nameDay;
  switch (numOfDay) {
    case 1:
      nameDay = 'Monday';
      break;
    case 2:
      nameDay = 'Tuesday';
      break;
    case 3:
      nameDay = 'Wednesday';
      break;
    case 4:
      nameDay = 'Thursday';
      break;
    case 5:
      nameDay = 'Friday';
      break;
    case 6:
      nameDay = 'Saturday';
      break;
    case 0:
      nameDay = 'Sunday';
      break;
    default:
      nameDay = 'error';
  }
  return nameDay;
}

/**
 * Returns the date of the next Friday from a given date.
 *
 * @param {Date} date
 * @return {Date}
 *
 * @example:
 * Date('2024-02-03T00:00:00Z') => Date('2024-02-09T00:00:00Z')
 * Date('2024-02-13T00:00:00Z') => Date('2024-02-16T00:00:00Z')
 * Date('2024-02-16T00:00:00Z') => Date('2024-02-23T00:00:00Z')
 */
function getNextFriday(date) {
  const newData = new Date(date);
  const day = newData.getDay();
  let nextFriday;
  switch (day) {
    case 1:
      nextFriday = 4;
      break;
    case 2:
      nextFriday = 3;
      break;
    case 3:
      nextFriday = 2;
      break;
    case 4:
      nextFriday = 1;
      break;
    case 5:
      nextFriday = 7;
      break;
    case 6:
      nextFriday = 6;
      break;
    case 0:
      nextFriday = 5;
      break;
    default:
      nextFriday = 'error';
  }
  newData.setDate(newData.getDate() + nextFriday);

  return newData;
}

/**
 * Returns the number of days in a specified month and year.
 *
 * @param {number} month - The month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The year as a four-digit number.
 * @return {number}
 *
 * @example:
 * 1, 2024 => 31
 * 2, 2024 => 29
 */
function getCountDaysInMonth(month, year) {
  const data = new Date(year, month, 0);
  return data.getDate();
}

/**
 * Returns the total number of days between two dates, including both the start and end dates.
 *
 * @param {string} dateStart - The start date of the period in ISO 8601 format.
 * @param {string} dateEnd - The end date of the period in ISO 8601 format.
 * @return {number} - The total count of days in the period.
 *
 * @example:
 * '2024-02-01T00:00:00.000Z', '2024-02-02T00:00:00.000Z'  => 2
 * '2024-02-01T00:00:00.000Z', '2024-02-12T00:00:00.000Z'  => 12
 */
function getCountDaysOnPeriod(dateStart, dateEnd) {
  const date1 = new Date(dateStart);
  const date2 = new Date(dateEnd);
  const secPerDay = 24 * 60 * 60 * 1000;

  const secondDifference = date2.getTime() - date1.getTime() + secPerDay;
  return Math.round(secondDifference / secPerDay);
}

/**
 * Returns true if a given date is within a specified range, including both the start and end dates.
 *
 * @typedef {{
 * start: string, // The start date in ISO 8601 format (e.g., 'YYYY-MM-DD').
 * end: string    // The end date in ISO 8601 format.
 * }} DatePeriod
 *
 * @param {string} date - The date to check, in ISO 8601 format.
 * @param {DatePeriod} period - The period to check against.
 * @return {boolean} - True if the date is within the range, false otherwise.
 *
 * @example:
 * '2024-02-01', { start: '2024-02-02', end: '2024-03-02' } => false
 * '2024-02-02', { start: '2024-02-02', end: '2024-03-02' } => true
 * '2024-02-10', { start: '2024-02-02', end: '2024-03-02' } => true
 */
function isDateInPeriod(date, period) {
  const newData = new Date(date);
  const startPeriod = new Date(period.start);
  const finishPerid = new Date(period.end);
  if (
    newData.getTime() >= startPeriod.getTime() &&
    newData.getTime() <= finishPerid.getTime()
  ) {
    return true;
  }
  return false;
}

/**
 * Returns the date formatted in 'M/D/YYYY, hh:mm:ss a'.
 *
 * @param {string} date - The date to be formatted, in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss.sssZ').
 * @return {string} - The date formatted in 'Month/Day/Year, Hour:Minute:Second AM/PM'.
 *
 * @example:
 * '2024-02-01T15:00:00.000Z' => '2/1/2024, 3:00:00 PM'
 * '1999-01-05T02:20:00.000Z' => '1/5/1999, 2:20:00 AM'
 * '2010-12-15T22:59:00.000Z' => '12/15/2010, 10:59:00 PM'
 */
function formatDate(date) {
  const newData = new Date(date);
  return newData.toLocaleString('en-US', { timeZone: 'UTC' });
}

/**
 * Returns the total number of weekend days (Saturdays and Sundays) in a specified month and year.
 *
 * @param {number} month - The source month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The source year as a four-digit number.
 * @return {number} - The total count of weekend days in the month.
 *
 * @example:
 * 5, 2022 => 9
 * 12, 2023 => 10
 * 1, 2024 => 8
 */
function getCountWeekendsInMonth(month, year) {
  const startPeriod = new Date(year, month - 1, 1);
  const finishPeriod = new Date(year, month, 0);
  let count = 0;
  for (let i = startPeriod; i <= finishPeriod; i.setDate(i.getDate() + 1)) {
    if (i.getDay() === 6 || i.getDay() === 0) {
      count += 1;
    }
  }
  return count;
}

/**
 * Returns the week number of the year for a given date.
 * The first week is the one that falls on January 1.
 * The first day of the week is Monday.
 *
 * @param {Date} date - The date for which to find the week number.
 * @return {number} - The week number of the year.
 *
 * @example:
 * Date(2024, 0, 3) => 1
 * Date(2024, 0, 31) => 5
 * Date(2024, 1, 23) => 8
 */
function getWeekNumberByDate(date) {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const dayOfYear =
    (date - startOfYear + 24 * 60 * 60 * 1000) / (24 * 60 * 60 * 1000);
  let janFirstDayOfWeek = startOfYear.getDay() - 1;
  if (janFirstDayOfWeek === -1) janFirstDayOfWeek = 6;
  const weekNumber = Math.ceil((dayOfYear + janFirstDayOfWeek) / 7);
  return weekNumber;
}

/**
 * Returns the date of the next Friday the 13th from a given date.
 * Friday the 13th is considered an unlucky day in some cultures.
 *
 * @param {Date} date - The starting date to search from.
 * @return {Date} - The date of the next Friday the 13th.
 *
 * @example:
 * Date(2024, 0, 13) => Date(2024, 8, 13)
 * Date(2023, 1, 1) => Date(2023, 9, 13)
 */
function getNextFridayThe13th(date) {
  const nextFriday13 = new Date(date);
  const currentYear = nextFriday13.getFullYear();
  const maxYear = currentYear + 1;
  while (nextFriday13.getFullYear() <= maxYear) {
    nextFriday13.setDate(13);
    if (nextFriday13.getDay() === 5) {
      return nextFriday13;
    }
    nextFriday13.setMonth(nextFriday13.getMonth() + 1);
  }
  return null;
}

/**
 * Returns the quarter of the year for a given date.
 *
 * @param {Date} date - The date for which to find the quarter.
 * @return {number} - The quarter of the year (1-4).
 *
 * @example:
 * Date(2024, 1, 13) => 1
 * Date(2024, 5, 1) => 2
 * Date(2024, 10, 10) => 4
 */
function getQuarter(date) {
  const month = date.getMonth();
  let result;
  if (month < 4) {
    result = 1;
  }
  if (month > 3 && month < 7) {
    result = 2;
  }
  if (month > 6 && month < 10) {
    result = 3;
  }
  if (month > 9) {
    result = 4;
  }
  return result;
}

/**
 * Generates an employee's work schedule within a specified date range, based on a pattern of working and off days.
 * The start and end dates of the period are inclusive.
 *
 * @typedef {{
 * start: string, // The start date in 'DD-MM-YYYY' format.
 * end: string    // The end date in 'DD-MM-YYYY' format.
 * }} DatePeriod
 *
 * @param {DatePeriod} period - The start and end dates of the period.
 * @param {number} countWorkDays - The number of consecutive working days.
 * @param {number} countOffDays - The number of consecutive days off.
 * @return {Array<string>} - An array of dates in 'DD-MM-YYYY' format representing the work schedule.
 *
 * @example:
 * { start: '01-01-2024', end: '15-01-2024' }, 1, 3 => ['01-01-2024', '05-01-2024', '09-01-2024', '13-01-2024']
 * { start: '01-01-2024', end: '10-01-2024' }, 1, 1 => ['01-01-2024', '03-01-2024', '05-01-2024', '07-01-2024', '09-01-2024']
 */
function getWorkSchedule(period, countWorkDays, countOffDays) {
  const startDate = new Date(period.start.split('-').reverse().join('-'));
  const endDate = new Date(period.end.split('-').reverse().join('-'));
  const currentDay = new Date(startDate);
  const schedule = [];
  while (currentDay <= endDate) {
    const daysSinceStart = Math.floor(
      (currentDay - startDate) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceStart % (countWorkDays + countOffDays) < countWorkDays) {
      const formattedDate = `${String(currentDay.getDate()).padStart(2, '0')}-${String(currentDay.getMonth() + 1).padStart(2, '0')}-${currentDay.getFullYear()}`;
      schedule.push(formattedDate);
    }
    currentDay.setDate(currentDay.getDate() + 1);
  }

  return schedule;
}

/**
 * Determines whether the year in the provided date is a leap year.
 * A leap year is a year divisible by 4, but not by 100, unless it is also divisible by 400.
 *
 * @param {Date} date - The date from which the year will be checked.
 * @return {boolean} - True if the year is a leap year, false otherwise.
 *
 * @example:
 * Date(2024, 2, 1) => true
 * Date(2022, 2, 1) => false
 * Date(2020, 2, 1) => true
 */
function isLeapYear(date) {
  const year = date.getFullYear();
  if (year % 4 === 0 || year % 400 === 0) {
    return true;
  }
  return false;
}

module.exports = {
  dateToTimestamp,
  getTime,
  getDayName,
  getNextFriday,
  getCountDaysInMonth,
  getCountDaysOnPeriod,
  isDateInPeriod,
  formatDate,
  getCountWeekendsInMonth,
  getWeekNumberByDate,
  getNextFridayThe13th,
  getQuarter,
  getWorkSchedule,
  isLeapYear,
};
