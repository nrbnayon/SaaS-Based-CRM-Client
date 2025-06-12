// src/app/(dashboard)/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
        <p className='text-muted-foreground'>
          Your main dashboard with detailed analytics.
        </p>
      </div>
      {/* Dashboard content */}
      <div className='grid gap-4'>
        <div className='rounded-lg border bg-card p-6'>
          <h2 className='text-xl font-semibold mb-4'>Recent Activity</h2>
          <p>Dashboard content goes here...</p>
        </div>
      </div>
    </div>
  );
}
