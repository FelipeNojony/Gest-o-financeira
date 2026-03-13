import useDashboard from '@/hooks/useDashboard';
import Header from '@/components/layout/Header';
import ErrorState from '@/components/ui/ErrorState';
import PeriodFilter from '@/components/dashboard/PeriodFilter';
import SummaryCards from '@/components/dashboard/SummaryCards';
import BarChartCard from '@/components/dashboard/BarChartCard';
import PieChartCard from '@/components/dashboard/PieChartCard';
import RecentTransactions from '@/components/dashboard/RecentTransactions';

export default function DashboardPage() {
  const { dashboardData, loading, error, period, setPeriod, refreshDashboard } =
    useDashboard();

  const {
    summary,
    expenseByCategory,
    incomeByCategory,
    monthlyData,
    recentTransactions,
  } = dashboardData;

  if (error) {
    return <ErrorState message={error} onRetry={refreshDashboard} />;
  }

  return (
    <div>
      <Header
        title="Dashboard"
        action={<PeriodFilter period={period} onChange={setPeriod} />}
      />

      <SummaryCards summary={summary} loading={loading} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="lg:col-span-2">
          <BarChartCard data={monthlyData} loading={loading} />
        </div>
        <PieChartCard
          title="Despesas por Categoria"
          data={expenseByCategory}
          loading={loading}
        />
        <PieChartCard
          title="Receitas por Categoria"
          data={incomeByCategory}
          loading={loading}
        />
      </div>

      <div className="mt-6">
        <RecentTransactions transactions={recentTransactions} loading={loading} />
      </div>
    </div>
  );
}
