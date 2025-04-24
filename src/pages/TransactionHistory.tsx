import React, { useState, useMemo } from 'react';

const TransactionHistory = () => {
  // Comprehensive transaction data
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: '2025-02-15',
      type: 'Payment',
      description: 'Monthly Subscription Renewal',
      category: 'Subscription',
      amount: 49.99,
      status: 'completed',
      paymentMethod: 'Credit Card',
      reference: 'TXN-2025-001'
    },
    {
      id: 2,
      date: '2025-02-10',
      type: 'Refund',
      description: 'Marketing Package Cancellation',
      category: 'Refund',
      amount: -199.50,
      status: 'processed',
      paymentMethod: 'PayPal',
      reference: 'REFUND-2025-001'
    },
    {
      id: 3,
      date: '2025-02-05',
      type: 'Charge',
      description: 'Cloud Storage Upgrade',
      category: 'Service',
      amount: 99.00,
      status: 'completed',
      paymentMethod: 'Bank Transfer',
      reference: 'TXN-2025-002'
    },
    {
      id: 4,
      date: '2025-01-25',
      type: 'Payment',
      description: 'Consulting Services',
      category: 'Professional Services',
      amount: 1500.00,
      status: 'completed',
      paymentMethod: 'Wire Transfer',
      reference: 'TXN-2025-003'
    }
  ]);

  // Filter and search state
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    category: 'all',
    searchTerm: '',
    dateRange: {
      start: '2025-01-01',
      end: '2025-12-31'
    }
  });

  // Sorting state
  const [sortConfig, setSortConfig] = useState<{
    key: keyof typeof transactions[0];
    direction: 'asc' | 'desc';
  }>({
    key: 'date',
    direction: 'desc'
  });

  // Filtered and sorted transactions
  const processedTransactions = useMemo(() => {
    let result = [...transactions];

    // Filter by type
    if (filters.type !== 'all') {
      result = result.filter(t => t.type.toLowerCase() === filters.type.toLowerCase());
    }

    // Filter by status
    if (filters.status !== 'all') {
      result = result.filter(t => t.status.toLowerCase() === filters.status.toLowerCase());
    }

    // Filter by category
    if (filters.category !== 'all') {
      result = result.filter(t => t.category.toLowerCase() === filters.category.toLowerCase());
    }

    // Date range filter
    result = result.filter(t => {
      const transactionDate = new Date(t.date);
      return (
        transactionDate >= new Date(filters.dateRange.start) &&
        transactionDate <= new Date(filters.dateRange.end)
      );
    });

    // Search filter
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      result = result.filter(t => 
        t.description.toLowerCase().includes(searchTerm) ||
        t.reference.toLowerCase().includes(searchTerm)
      );
    }

    // Sorting
    return result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [transactions, filters, sortConfig]);

  // Calculate transaction statistics
  type TransactionStats = {
    total: number;
    totalAmount: number;
    byType: Record<string, number>;
    byStatus: Record<string, number>;
  };

  const transactionStats: TransactionStats = useMemo(() => {
    const stats: TransactionStats = {
      total: processedTransactions.length,
      totalAmount: processedTransactions.reduce((sum, t) => sum + t.amount, 0),
      byType: {},
      byStatus: {}
    };

    processedTransactions.forEach(t => {
      // Count by type
      stats.byType[t.type] = (stats.byType[t.type] || 0) + 1;
      
      // Count by status
      stats.byStatus[t.status] = (stats.byStatus[t.status] || 0) + 1;
    });

    return stats;
  }, [processedTransactions]);

  // Handle sorting
  const handleSort = (key: keyof typeof transactions[0]) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Handle transaction actions
  const handleTransactionAction = (transactionId: number, action: string) => {
    switch(action) {
      case 'view':
        alert(`Viewing details for transaction ${transactionId}`);
        break;
      case 'download':
        alert(`Downloading receipt for transaction ${transactionId}`);
        break;
      default:
        break;
    }
  };

  // Unique categories and types for filtering
  const uniqueCategories = ['All', ...new Set(transactions.map(t => t.category))];
  const uniqueTypes = ['All', ...new Set(transactions.map(t => t.type))];
  const uniqueStatuses = ['All', ...new Set(transactions.map(t => t.status))];

  return (
    <div className="space-y-6">
      {/* Transaction Statistics */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Transaction Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Transactions</p>
            <p className="text-2xl font-bold text-blue-600">
              {transactionStats.total}
            </p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Amount</p>
            <p className={`text-2xl font-bold ${
              transactionStats.totalAmount >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              ${Math.abs(transactionStats.totalAmount).toFixed(2)}
            </p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Transaction Types</p>
            <p className="text-2xl font-bold text-purple-600">
              {Object.keys(transactionStats.byType).length}
            </p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Completed Transactions</p>
            <p className="text-2xl font-bold text-yellow-600">
              {transactionStats.byStatus['completed'] || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Transactions Filters */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          {/* Type Filter */}
          <select 
            className="border rounded px-2 py-1"
            value={filters.type}
            onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
          >
            {uniqueTypes.map(type => (
              <option key={type} value={type.toLowerCase()}>
                {type} Transactions
              </option>
            ))}
          </select>

          {/* Category Filter */}
          <select 
            className="border rounded px-2 py-1"
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
          >
            {uniqueCategories.map(category => (
              <option key={category} value={category.toLowerCase()}>
                {category} Category
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select 
            className="border rounded px-2 py-1"
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          >
            {uniqueStatuses.map(status => (
              <option key={status} value={status.toLowerCase()}>
                {status} Status
              </option>
            ))}
          </select>

          {/* Date Range */}
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">From</label>
            <input 
              type="date" 
              className="border rounded px-2 py-1"
              value={filters.dateRange.start}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                dateRange: { ...prev.dateRange, start: e.target.value }
              }))}
            />
            <label className="text-sm text-gray-600">To</label>
            <input 
              type="date" 
              className="border rounded px-2 py-1"
              value={filters.dateRange.end}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                dateRange: { ...prev.dateRange, end: e.target.value }
              }))}
            />
          </div>

          {/* Search Input */}
          <input 
            type="text"
            placeholder="Search transactions..."
            className="border rounded px-2 py-1 flex-grow"
            value={filters.searchTerm}
            onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
          />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Date', 'Type', 'Description', 'Category', 'Amount', 'Payment Method', 'Status', 'Actions'].map(header => (
                <th 
                  key={header}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ${
                    ['Date', 'Type', 'Category', 'Amount'].includes(header) ? 'cursor-pointer' : ''
                  }`}
                  onClick={() => {
                    const key = header.toLowerCase();
                    if (['date', 'type', 'category', 'amount'].includes(key)) {
                      handleSort(key as keyof typeof transactions[0]);
                    }
                  }}
                >
                  {header}
                  {sortConfig.key === header.toLowerCase() && (
                    <span>{sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {processedTransactions.map(transaction => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.category}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  ${Math.abs(transaction.amount).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.paymentMethod}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 
                    transaction.status === 'processed' ? 'bg-blue-100 text-blue-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button 
                    className="text-blue-600 hover:text-blue-900"
                    onClick={() => handleTransactionAction(transaction.id, 'view')}
                  >
                    View
                  </button>
                  <button 
                    className="text-gray-600 hover:text-gray-900"
                    onClick={() => handleTransactionAction(transaction.id, 'download')}
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* No Transactions Handling */}
        {processedTransactions.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No transactions found matching your search criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;