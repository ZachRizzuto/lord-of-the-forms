import { allCities } from "./all-cities";
import { capitalize } from "./transformations";

export function isEmailValid(emailAddress: string) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailAddress.match(regex);
}

export const isFirstNameValid = (firstName: string) => firstName.length >= 2;
export const isLastNameValid = (lastName: string) => lastName.length >= 2;
export const isCityValid = (city: string) =>
  allCities.includes(capitalize(city));
export const isPhoneNumberValid = (phone: string) => phone.length === 10;
