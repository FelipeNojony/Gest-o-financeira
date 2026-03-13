const widthPattern = ['w-3/4', 'w-full', 'w-1/2'];

export default function LoadingSkeleton({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`animate-pulse bg-gray-200 rounded h-4 ${widthPattern[index % widthPattern.length]}`}
        />
      ))}
    </div>
  );
}
