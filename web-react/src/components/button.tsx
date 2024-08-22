import { Loader2 } from "lucide-react";
import { ComponentProps, ReactNode } from "react";
import { VariantProps, tv } from "tailwind-variants";

const buttonVariants = tv({
  base: "rounded-md inline-block justify-center items-center flex shrink-0 w-full font-medium gap-2",

  variants: {
    variant: {
      primary:
        "border-blue-600 bg-blue-600 text-white hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white",
      secondary:
        "border-red-600 bg-red-600 text-white hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring active:text-red-500 dark:hover:bg-red-700 dark:hover:text-white",
    },
    disabled: {
      true: "opacity-50 cursor-not-allowed",
    },
    size: {
      default: "px-12 py-4 text-sm",
      small: "w-14 py-3 text-xs",
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
}

export function Button({
  children,
  variant,
  size,
  isLoading,
  isDisabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={isDisabled}
      {...rest}
      className={buttonVariants({ variant, size, disabled: isDisabled })}
    >
      {isLoading && <Loader2 className="size-5 animate-spin mr-2" />}
      {children}
    </button>
  );
}
