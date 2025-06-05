'use client';
import { cn } from '@/lib/utils';
import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        // new visual style ↓↓↓
        'rounded-2xl border border-outline bg-surface/70 backdrop-blur-sm',
        'shadow-lg shadow-black/40 transition transform',
        'hover:shadow-xl hover:-translate-y-px',
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-5', className)} {...props} />
  );
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <h3 className={cn('font-semibold text-textBase', className)} {...props} />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-5', className)} {...props} />
  );
}
