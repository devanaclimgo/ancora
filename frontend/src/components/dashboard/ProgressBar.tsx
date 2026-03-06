interface ProgressBarProps {
  filled: number;
  total: number;
}

export default function ProgressBar({ filled, total }: ProgressBarProps) {
  const percentage = total === 0 ? 0 : Math.round((filled / total) * 100);

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 bg-ring-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <span className="text-xs font-medium text-gray-500 whitespace-nowrap">
        {filled}/{total} dias
      </span>
    </div>
  );
}
