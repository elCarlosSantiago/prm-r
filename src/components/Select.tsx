import React, { forwardRef } from "react"
import { type UseFormRegisterReturn } from "react-hook-form"

type SelectProps = {
  label?: string
  options: { id?: string; name: string }[]
  register?: UseFormRegisterReturn
  defaultId?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, defaultId, ...selectProps }, ref) => {
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
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900
          focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700
          dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          {...selectProps}
          ref={ref}
        >
          {options.map((option, i) => (
            <option
              key={`${option?.name}-${i}`}
              value={option.id}
              {...(defaultId === option.id ? { selected: true } : {})}
            >
              {option.name}
            </option>
          ))}
        </select>
      </React.Fragment>
    )
  }
)

Select.displayName = "Select"
