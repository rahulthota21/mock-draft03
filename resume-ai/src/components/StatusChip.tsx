import clsx from 'clsx';
import { CheckCircle, ThumbsUp, AlertTriangle, XCircle } from 'lucide-react';

export type StatusLabel = 'Outstanding' | 'Good' | 'Fair' | 'Failed';

const palette: Record<StatusLabel, { bg: string; text: string; icon: JSX.Element }> = {
  Outstanding: {
    bg: 'bg-green-700/20',
    text: 'text-green-400',
    icon: <CheckCircle className="mr-1 h-5 w-5" aria-hidden />,
  },
  Good: {
    bg: 'bg-blue-700/20',
    text: 'text-blue-400',
    icon: <ThumbsUp className="mr-1 h-5 w-5" aria-hidden />,
  },
  Fair: {
    bg: 'bg-yellow-600/20',
    text: 'text-yellow-400',
    icon: <AlertTriangle className="mr-1 h-5 w-5" aria-hidden />,
  },
  Failed: {
    bg: 'bg-red-700/20',
    text: 'text-red-400',
    icon: <XCircle className="mr-1 h-5 w-5" aria-hidden />,
  },
};

export default function StatusChip({ label }: { label: StatusLabel }) {
  const { bg, text, icon } = palette[label];
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-3 py-1 text-[14px] font-semibold',
        bg,
        text
      )}
      role="status"
      aria-label={label}
    >
      {icon}
      {label}
    </span>
  );
}
