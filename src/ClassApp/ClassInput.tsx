import { Component, ComponentProps, ReactNode } from "react";

type InputProps = ComponentProps<"input">;

export class Input extends Component<{
  inputProps: InputProps;
  labelText: string;
}> {
  render(): ReactNode {
    const { inputProps, labelText } = this.props;
    return (
      <>
        <label htmlFor="">{labelText}</label>
        <input {...inputProps} />
      </>
    );
  }
}
