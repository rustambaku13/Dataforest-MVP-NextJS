import moment from 'moment';

export function formatDate(date) {
  const momentDate = moment(date);
  const momentNow = moment();

  const minDiff = momentNow.diff(momentDate, "minutes");
  if (minDiff < 60) {
    return `${minDiff}m`;
  }
  else {
    const hourDiff = momentNow.diff(momentDate, "hours");
    if (hourDiff < 24) {
      return `${hourDiff}h`;
    }
    else {
      const dayDiff = momentNow.diff(momentDate, "days");
      return `${dayDiff}d`;
    }
  }
}