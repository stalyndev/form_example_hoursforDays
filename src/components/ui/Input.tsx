'use client'

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { useState } from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef(
  (
    { className, type = 'text', ...props }: Props,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const [showPassword, setShowPassword] = useState(false)

    if (type === 'password') {
      return (
        <div className="flex rounded-md border border-slate-800 bg-white pr-2 text-slate-900 ring-0 focus:ring-inset focus:ring-indigo-600">
          <input
            type={showPassword ? 'text' : 'password'}
            ref={ref}
            {...props}
            className={clsx(
              'block w-full rounded-md border-0 px-3  py-1.5  font-medium text-slate-900 placeholder:text-gray-400 sm:text-sm sm:leading-6',
              className,
            )}
          />
          <button
            type="button"
            className="mx-2 bg-white "
            onClick={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? (
              <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            ) : (
              <EyeSlashIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      )
    }

    return (
      <input
        type={type}
        ref={ref}
        {...props}
        className={clsx(
          'block w-full rounded-md border-0 px-3  py-1.5 font-medium text-gray-800 shadow-sm ring-1  ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
          className,
        )}
      />
    )
  },
)

Input.displayName = 'Input'

export default Input
