import Cookies from "universal-cookie";

export const setCookie = (key, value, option) => {
  let cookies = new Cookies();
  cookies.set(key, value, option);
};

export const getCookie = (key) => {
  let cookies = new Cookies();
  return cookies.get(key);
};

export const removeCookie = (key, option) => {
  let cookies = new Cookies();
  cookies.remove(key, option);
};

export function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function validateDate(dateInput) {
  const date = new Date(dateInput);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}
export function validateInputAddresses(address) {
  var re = new RegExp("^0x[a-fA-F0-9]{40}$");
  return re.test(address);
}

export function setLengthString(str, max, char) {
  let firstSubString = "";
  if (str && str?.length >= max) {
    firstSubString += str?.substring(0, max);
  }
  let SecondSubString = str?.substring(20);

  let newString = firstSubString + char + SecondSubString;
  return newString;
}

export const hanldeError = (value) => {
  console.log();
};

export const getDisplayAddress = (address) => {
  const result = `${address?.substring(0, 5)}...${address?.substring(
    address ? address?.length - 5 : 0,
    address ? address?.length : 1
  )}`;
  return result;
};

export const numberWithCharacter = (value) => {
  return parseFloat(value)
    ?.toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

export const bidWithCharacter = (value) => {
  return parseFloat(value)
    ?.toFixed(2)
    ?.toString()
    ?.replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
};
