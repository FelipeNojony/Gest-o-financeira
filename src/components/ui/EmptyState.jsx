export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {Icon && (
        <div className="rounded-full bg-gray-100 p-4 mb-4">
          <Icon size={32} className="text-gray-400" />
        </div>
      )}
      {title && (
        <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      )}
      {description && (
        <p className="text-sm text-gray-500 mb-4">{description}</p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
