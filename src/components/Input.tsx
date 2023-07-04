import { forwardRef } from "react"
import { type UseFormRegisterReturn } from "react-hook-form"

type InputProps = {
  size?: "sm" | "md" | "lg"
  label?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: "text" | "password" | "email" | "number"
  error?: string
  disabled?: boolean
  step?: number
  register?: UseFormRegisterReturn //TODO: Fix this
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size = "md", label, ...inputProps }, ref) => {
    if (size === "sm")
      return (
        <div>
          {label && (
            <label
              htmlFor="small-input"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              {label}
            </label>
          )}
          <input
            id="small-input"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-xs"
            min={0}
            {...inputProps}
            ref={ref}
          />
        </div>
      )

    if (size === "md") {
      return (
        <div className="mb-6">
          {label && (
            <label
              htmlFor="base-input"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              {label}
            </label>
          )}
          <input
            min={0}
            ref={ref}
            {...inputProps}
            id="base-input"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          />
        </div>
      )
    }

    return (
      <div className="mb-6">
        {label && (
          <label
            htmlFor="large-input"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            {label}
          </label>
        )}
        <input
          min={0}
          ref={ref}
          {...inputProps}
          id="large-input"
          className="sm:text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </div>
    )
  }
)

Input.displayName = "Input"
