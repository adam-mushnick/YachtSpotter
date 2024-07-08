//searches a string and retrieves value of specific cookie defined by a 'key' parameter
//document.cookie is a string that contains all the cookies for the current document
//each cookie is separated by a semicolon ;
export function getCookie(key: string) {
  const b = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}

export function currencyFormat(amount: number) {
  return '$' + (amount / 100).toFixed(2);
}
