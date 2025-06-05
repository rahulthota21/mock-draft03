import { ButtonHTMLAttributes, FC } from 'react';
import { cn } from '@/lib/utils';

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => (
  <button
    {...props}
    className={cn(
      'bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded shadow disabled:opacity-50',
      className
    )}
  />
);
