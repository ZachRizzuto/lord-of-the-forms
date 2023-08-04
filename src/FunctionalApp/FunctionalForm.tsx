import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { Input } from "./FunctionalInput";
import { PhoneInputState, UserInformation } from "../types";
import { PhoneInput } from "./FunctionalPhoneInput";
import { formatPhoneNumber } from "../utils/transformations";
import {
  isCityValid,
  isEmailValid,
  isFirstNameValid,
  isLastNameValid,
  isPhoneNumberValid,
} from "../utils/validations";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = ({
  handleUserInfo,
}: {
  handleUserInfo: (userInfo: UserInformation) => void;
}) => {
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [phoneInput, setPhoneInput] = useState<PhoneInputState>([
    "",
    "",
    "",
    "",
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const resetStates = () => {
    setFirstNameInput("");
    setLastNameInput("");
    setEmailInput("");
    setCityInput("");
    setPhoneInput(["", "", "", ""]);
  };
  const isFormValid = () => {
    if (
      isCityValid(cityInput) &&
      isEmailValid(emailInput) &&
      isFirstNameValid(firstNameInput) &&
      isLastNameValid(lastNameInput) &&
      isPhoneNumberValid(formatPhoneNumber(phoneInput))
    ) {
      return true;
    } else {
      alert("Bad Inputs");
      return false;
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (isFormValid()) {
          resetStates();
          setIsSubmitted(false);
          handleUserInfo({
            firstName: firstNameInput,
            lastName: lastNameInput,
            email: emailInput,
            city: cityInput,
            phone: formatPhoneNumber(phoneInput),
          });
        } else {
          setIsSubmitted(true);
        }
      }}
    >
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <div className="input-wrap">
        <Input
          inputProps={{
            type: "text",
            placeholder: "Bilbo",
            onChange: (e) => setFirstNameInput(e.target.value),
            value: firstNameInput,
          }}
          labelText={"First Name:"}
        />
      </div>
      <ErrorMessage
        message={firstNameErrorMessage}
        show={!isFirstNameValid(firstNameInput) && isSubmitted}
      />

      {/* last name input */}
      <div className="input-wrap">
        <Input
          inputProps={{
            type: "text",
            placeholder: "Baggins",
            onChange: (e) => setLastNameInput(e.target.value),
            value: lastNameInput,
          }}
          labelText={"Last Name:"}
        />
      </div>
      <ErrorMessage
        message={lastNameErrorMessage}
        show={!isLastNameValid(lastNameInput) && isSubmitted}
      />

      {/* Email Input */}
      <div className="input-wrap">
        <Input
          inputProps={{
            placeholder: "bilbo-baggins@adventurehobbits.net",
            onChange: (e) => setEmailInput(e.target.value),
            value: emailInput,
          }}
          labelText={"Email:"}
        />
      </div>
      <ErrorMessage
        message={emailErrorMessage}
        show={!isEmailValid(emailInput) && isSubmitted}
      />

      {/* City Input */}
      <div className="input-wrap">
        <Input
          inputProps={{
            placeholder: "hobbiton",
            type: "text",
            list: "cities",
            onChange: (e) => setCityInput(e.target.value),
            value: cityInput,
          }}
          labelText={"City:"}
        />
      </div>
      <ErrorMessage
        message={cityErrorMessage}
        show={!isCityValid(cityInput) && isSubmitted}
      />

      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap">
          <PhoneInput
            phoneInput={phoneInput}
            handlePhoneInput={(state: PhoneInputState) => setPhoneInput(state)}
          />
        </div>
      </div>

      <ErrorMessage
        message={phoneNumberErrorMessage}
        show={!isPhoneNumberValid(formatPhoneNumber(phoneInput)) && isSubmitted}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};
