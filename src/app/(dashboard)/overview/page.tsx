import DashboardHeader from "../components/dashboard-header";

// src/app/(dashboard)/overview/page.tsx
export default function OverviewPage() {
  return (
      <div className='space-y-6'>
          <DashboardHeader/>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Overview</h1>
        <p className='text-muted-foreground'>
          Welcome to your dashboard overview.
        </p>
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <div className='rounded-lg border bg-card text-card-foreground shadow-sm p-6'>
          <div className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <h3 className='tracking-tight text-sm font-medium'>
              Total Revenue
            </h3>
          </div>
          <div className='text-2xl font-bold'>$45,231.89</div>
          <p className='text-xs text-muted-foreground'>
            +20.1% from last month
          </p>
        </div>
        {/* Add more cards as needed */}
      </div>
    </div>
  );
}
