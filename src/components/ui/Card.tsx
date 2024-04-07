import clsx from 'clsx'
import { twMerge } from 'tw-merge'

interface Props {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: Props) {
  return (
    <div
      className={twMerge(
        clsx(clsx(' mt-1  rounded-md p-7 text-gray-800 shadow-lg', className)),
      )}
    >
      {children}
    </div>
  )
}
export default Card
