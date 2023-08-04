import { ComponentProps } from "react";

type InputProps = ComponentProps<"input">;

export const Input = ({
  inputProps,
  labelText,
}: {
  inputProps: InputProps;
  labelText: string | null;
}) => {
  return (
    <>
      <label htmlFor="">{labelText}</label>
      <input {...inputProps} />
    </>
  );
};
