import React, { forwardRef } from "react"
import { type UseFormRegisterReturn } from "react-hook-form"

type SelectProps = {
  label?: string
  options: { value: string; label: string }[]
  register?: UseFormRegisterReturn
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, ...selectProps }, ref) => {
    return (
      <React.Fragment>
        {label && (
          <label
            htmlFor="countries"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            {label}
          </label>
        )}
        <select
          id="countries"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          {...selectProps}
        >
          {options.map((option, i) => (
            <option key={`${option.value}-${i}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </React.Fragment>
    )
  }
)

Select.displayName = "Select"
