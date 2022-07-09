//Возвращение куки
export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

//Установка куки
export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

//Удаление куки
export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}

//Функцуия форматирования даты
export const formatDate = (date) => {
  const formatter = new Intl.DateTimeFormat("ru", {
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'UTC'
  });

  let dateOfOrder = new Date(date);

  const today = new Date();

  function diffSubtract(dayOne, dayTwo) {
    return Math.floor((dayOne - dayTwo) / 86400000);
  }

  let dayQty = diffSubtract(today, dateOfOrder);

  const formatDay = (dateOfOrder, dayQty) => {
    if (dayQty === 0) {
      return 'Cегодня'
    }
    if (dayQty === 1) {
      return 'Вчера'
    }
    if (dayQty === 2 || dayQty === 3 || dayQty === 4) {
      return `${dayQty} дня назад`
    }
    if (dayQty > 4 ) {
      return `${dateOfOrder.toLocaleDateString("ru-RU")}`
    }

  }
  return `${formatDay(dateOfOrder, dayQty)}, ${formatter.format(dateOfOrder)} i-GMT+3`
}
