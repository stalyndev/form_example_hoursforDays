import clsx from "clsx";
import { twMerge } from "tw-merge";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge(
        clsx(
          "block rounded-md bg-blue-700 p-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 disabled:opacity-50",
          className
        )
      )}
      {...props}
    >
      {children}
    </button>
  );
}
export default Button;
