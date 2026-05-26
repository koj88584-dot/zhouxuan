export default function SiteLoading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-label="Loading page content">
      <div className="flex flex-col items-center gap-4">
        <div className="size-10 animate-spin rounded-full border-[3px] border-olive-200 border-t-olive-700" />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}