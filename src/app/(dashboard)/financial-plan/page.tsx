// src/app/(dashboard)/financial-plan/page.tsx
export default function FinancialPlanPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Financial Plan</h1>
        <p className='text-muted-foreground'>
          Manage your financial planning and budgets.
        </p>
      </div>
      {/* Financial plan content */}
      <div className='grid gap-4'>
        <div className='rounded-lg border bg-card p-6'>
          <h2 className='text-xl font-semibold mb-4'>Budget Overview</h2>
          <p>Financial planning content goes here...</p>
        </div>
      </div>
    </div>
  );
}
