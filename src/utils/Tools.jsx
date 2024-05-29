import moment from 'moment';
import 'moment/locale/fr';

export const checkInputIfEmpty = (value) => {
  return (
    value != null &&
    (typeof value !== 'string' || value.trim() !== '') &&
    value.length !== 0
  )
    ? value
    : null;
};


export const formatToInput = (date) => {
  return date ? moment(date).format("YYYY-MM-DD") : "";
};

export const format_datetime = (date) => {
  return moment(date).format("DD/MM/YYYY HH:mm");
};

export const format_date = (date) => {
  return checkInputIfEmpty(date) ? moment(date).format("DD/MM/YYYY") : "";
};
export const date_french = (date) => {
  var localeData = moment.localeData(moment.locale("fr")),
    LLLL = localeData.longDateFormat("LLLL"),
    LLL = localeData.longDateFormat("LLL"),
    LL = localeData.longDateFormat("LL"),
    format = LLLL.replace(LLL.replace(LL, ""), "");
  return moment(date).format(format);
};