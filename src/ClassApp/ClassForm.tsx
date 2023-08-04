import { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { Input } from "./ClassInput";
import { PhoneInputState, UserInformation } from "../types";
import { PhoneInput } from "./ClassPhoneInput";
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

export class ClassForm extends Component<{
  handleUserInfo: (userInfo: UserInformation) => void;
}> {
  state = {
    isSubmitted: false,
    firstNameInput: "",
    lastNameInput: "",
    emailInput: "",
    cityInput: "",
    phoneInput: ["", "", "", ""],
  };
  render() {
    const {
      isSubmitted,
      firstNameInput,
      lastNameInput,
      emailInput,
      cityInput,
      phoneInput,
    } = this.state;
    const { handleUserInfo } = this.props;
    const resetStates = () => {
      this.setState({
        firstNameInput: "",
        lastNameInput: "",
        emailInput: "",
        cityInput: "",
        phoneInput: ["", "", "", ""],
      });
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
            this.setState({ isSubmitted: false });
            handleUserInfo({
              firstName: firstNameInput,
              lastName: lastNameInput,
              email: emailInput,
              city: cityInput,
              phone: formatPhoneNumber(phoneInput),
            });
          } else {
            this.setState({ isSubmitted: true });
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
              onChange: (e) =>
                this.setState({ firstNameInput: e.target.value }),
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
              onChange: (e) => this.setState({ lastNameInput: e.target.value }),
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
              onChange: (e) => this.setState({ emailInput: e.target.value }),
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
              onChange: (e) => this.setState({ cityInput: e.target.value }),
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
              handlePhoneInput={(state: PhoneInputState) =>
                this.setState({ phoneInput: state })
              }
            />
          </div>
        </div>

        <ErrorMessage
          message={phoneNumberErrorMessage}
          show={
            !isPhoneNumberValid(formatPhoneNumber(phoneInput)) && isSubmitted
          }
        />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
