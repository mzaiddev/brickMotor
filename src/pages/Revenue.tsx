import { useState, useMemo } from 'react';

const RevenueAndPayouts = () => {
  // Sample revenue data with more detailed structure
  const [revenueData, setRevenueData] = useState({
    yearToDate: {
      totalRevenue: 125750,
      totalExpenses: 87625,
      netProfit: 38125,
      profitMargin: 30.3
    },
    monthlyBreakdown: [
      { month: 'January', revenue: 42500, expenses: 29750, profit: 12750 },
      { month: 'February', revenue: 41250, expenses: 28875, profit: 12375 },
      { month: 'March', revenue: 42000, expenses: 29000, profit: 13000 }
    ],
    payouts: [
      { 
        id: 1, 
        date: '2025-02-15', 
        amount: 15000, 
        status: 'completed', 
        method: 'Bank Transfer',
        description: 'Quarterly Profit Distribution'
      },
      { 
        id: 2, 
        date: '2025-01-15', 
        amount: 12500, 
        status: 'processed', 
        method: 'PayPal',
        description: 'Monthly Revenue Share'
      }
    ]
  });

  // State for filtering and sorting
  const [filter, setFilter] = useState({
    timeframe: 'ytd',
    payoutStatus: 'all'
  });

  // State for date range selection
  const [dateRange, setDateRange] = useState({
    start: '2025-01-01',
    end: '2025-03-31'
  });

  // Filtered and sorted payouts
  const filteredPayouts = useMemo(() => {
    let result = [...revenueData.payouts];

    // Filter by status
    if (filter.payoutStatus !== 'all') {
      result = result.filter(payout => payout.status === filter.payoutStatus);
    }

    // Sort by date (most recent first)
    return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [revenueData.payouts, filter.payoutStatus]);

  // Revenue analysis calculations
  const revenueAnalysis = useMemo(() => {
    let analysisData;

    switch(filter.timeframe) {
      case 'monthly':
        // Last month's data
        analysisData = revenueData.monthlyBreakdown[revenueData.monthlyBreakdown.length - 1];
        break;
      case 'ytd':
      default:
        analysisData = revenueData.yearToDate;
        break;
    }

    return {
      totalRevenue: 'totalRevenue' in analysisData ? analysisData.totalRevenue : analysisData.revenue,
      totalExpenses: 'totalExpenses' in analysisData ? analysisData.totalExpenses : analysisData.expenses,
      netProfit: 'netProfit' in analysisData ? analysisData.netProfit : analysisData.profit,
      profitMargin: 'profitMargin' in analysisData ? analysisData.profitMargin : 
        ((analysisData.profit / analysisData.revenue) * 100).toFixed(2)
    };
  }, [revenueData, filter.timeframe]);

  // Handle payout actions
  const handlePayoutAction = (payoutId: number, action: string) => {
    switch(action) {
      case 'view':
        alert(`Viewing details for payout ${payoutId}`);
        break;
      case 'download':
        alert(`Downloading payout receipt for ${payoutId}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Revenue Summary */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Revenue & Profit Analysis</h2>
          
          <div className="flex items-center space-x-2">
            {/* Timeframe Selector */}
            <select 
              className="border rounded px-2 py-1"
              value={filter.timeframe}
              onChange={(e) => setFilter(prev => ({ ...prev, timeframe: e.target.value }))}
            >
              <option value="ytd">Year to Date</option>
              <option value="monthly">Last Month</option>
            </select>
          </div>
        </div>

        {/* Revenue Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-2xl font-bold text-blue-600">
              ${revenueAnalysis.totalRevenue.toLocaleString()}
            </p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Expenses</p>
            <p className="text-2xl font-bold text-green-600">
              ${revenueAnalysis.totalExpenses.toLocaleString()}
            </p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Net Profit</p>
            <p className="text-2xl font-bold text-purple-600">
              ${revenueAnalysis.netProfit.toLocaleString()}
            </p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Profit Margin</p>
            <p className="text-2xl font-bold text-yellow-600">
              {revenueAnalysis.profitMargin}%
            </p>
          </div>
        </div>
      </div>

      {/* Payouts Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Payouts</h2>
          
          <div className="flex items-center space-x-2">
            {/* Payout Status Filter */}
            <select 
              className="border rounded px-2 py-1"
              value={filter.payoutStatus}
              onChange={(e) => setFilter(prev => ({ ...prev, payoutStatus: e.target.value }))}
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="processed">Processed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Payouts Table */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPayouts.map(payout => (
              <tr key={payout.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(payout.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${payout.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {payout.method}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {payout.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    payout.status === 'completed' ? 'bg-green-100 text-green-800' : 
                    payout.status === 'processed' ? 'bg-blue-100 text-blue-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {payout.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button 
                    className="text-blue-600 hover:text-blue-900"
                    onClick={() => handlePayoutAction(payout.id, 'view')}
                  >
                    View
                  </button>
                  <button 
                    className="text-gray-600 hover:text-gray-900"
                    onClick={() => handlePayoutAction(payout.id, 'download')}
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* No Payouts Handling */}
        {filteredPayouts.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No payouts found matching your filter criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueAndPayouts;