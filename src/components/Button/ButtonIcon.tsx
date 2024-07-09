import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function ButtonIcon({ className, children, type = "button", ...props }: Props) {
  return (
    <button
      type={type}
      className={clsx(
        "aspect-square h-7 w-7 p-0 text-black",
        "opacity-80 hover:opacity-100 active:opacity-60",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
