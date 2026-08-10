export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in-up">
      {Icon && (
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 text-primary">
          <Icon className="h-10 w-10" strokeWidth={1.5} />
        </div>
      )}
      <p className="font-semibold text-text-dark text-lg">{title}</p>
      {description && (
        <p className="mt-2 text-sm text-text-muted max-w-sm">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
