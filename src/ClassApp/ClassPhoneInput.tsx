import { ChangeEventHandler, Component, createRef } from "react";
import { PhoneInputState } from "../types";

export class PhoneInput extends Component<{
  phoneInput: string[];
  handlePhoneInput: (state: PhoneInputState) => void;
}> {
  render() {
    const { phoneInput, handlePhoneInput } = this.props;
    const refs = [
      createRef<HTMLInputElement>(),
      createRef<HTMLInputElement>(),
      createRef<HTMLInputElement>(),
      createRef<HTMLInputElement>(),
    ];
    const ref1 = refs[0];
    const ref2 = refs[1];
    const ref3 = refs[2];
    const ref4 = refs[3];
    const lengths = [2, 2, 2, 1];
    const createOnChangeHandler =
      (index: 0 | 1 | 2 | 3): ChangeEventHandler<HTMLInputElement> =>
      (e) => {
        const currentMaxLength = lengths[index];
        const nextRef = refs[index + 1];
        const prevRef = refs[index - 1];
        const value = e.target.value;
        const shouldGoToNextRef =
          currentMaxLength === value.length && nextRef?.current;
        const shouldGoToPrevRef = value.length === 0 && prevRef?.current;

        const newState = phoneInput.map((phoneInput, phoneInputIndex) => {
          if (index === phoneInputIndex) {
            if (e.target.value.match("^[0-9]*$")) {
              return e.currentTarget.value;
            } else {
              return "";
            }
          } else {
            return phoneInput;
          }
        }) as PhoneInputState;
        if (shouldGoToNextRef) {
          nextRef.current?.focus();
        }
        if (shouldGoToPrevRef) {
          prevRef.current?.focus();
        }
        handlePhoneInput(newState);
      };
    return (
      <>
        <input
          type="tel"
          ref={ref1}
          value={phoneInput[0]}
          onChange={createOnChangeHandler(0)}
          maxLength={lengths[0]}
          placeholder="55"
          id="phone-input-1"
          inputMode="numeric"
        />
        -
        <input
          type="tel"
          ref={ref2}
          value={phoneInput[1]}
          onChange={createOnChangeHandler(1)}
          maxLength={lengths[1]}
          placeholder="55"
          id="phone-input-2"
          inputMode="numeric"
        />
        -
        <input
          type="tel"
          ref={ref3}
          value={phoneInput[2]}
          onChange={createOnChangeHandler(2)}
          maxLength={lengths[2]}
          placeholder="55"
          id="phone-input-3"
          inputMode="numeric"
        />
        -
        <input
          type="tel"
          ref={ref4}
          value={phoneInput[3]}
          onChange={createOnChangeHandler(3)}
          maxLength={lengths[3]}
          placeholder="5"
          id="phone-input-4"
          inputMode="numeric"
        />
      </>
    );
  }
}
