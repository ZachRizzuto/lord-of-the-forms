import { PhoneInputState } from "../types";

export const capitalize = (string: string) => {
  // todo: build this function
  // `capitalize("jOn")` should output `"Jon"`
  return string
    .split("")
    .map((char, i) => (i === 0 ? char.toUpperCase() : char.toLowerCase()))
    .join("");
};

export const formatPhoneNumber = (numbers: PhoneInputState) => {
  // todo: build this function
  // `formatPhoneNumber("1234567")` should be `"12-34-56-7"`
  return numbers
    .map((number) => {
      return number.length === 2 ? `${number}-` : number;
    })
    .join("");
};
