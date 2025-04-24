import { useState, useMemo } from 'react';

// Invoices Component with Enhanced Functionality
const Invoices = () => {
  // State for invoices with more detailed information
  const [invoices, setInvoices] = useState([
    { 
      id: 1, 
      number: 'INV-2025-001', 
      date: '2025-02-15', 
      amount: 2500, 
      status: 'paid',
      client: 'Acme Corporation',
      description: 'Monthly Web Hosting Services',
      dueDate: '2025-03-01'
    },
    { 
      id: 2, 
      number: 'INV-2025-002', 
      date: '2025-03-01', 
      amount: 1200, 
      status: 'pending',
      client: 'Tech Innovations Inc.',
      description: 'Cloud Infrastructure Support',
      dueDate: '2025-03-15'
    },
    { 
      id: 3, 
      number: 'INV-2025-003', 
      date: '2025-03-15', 
      amount: 350, 
      status: 'draft',
      client: 'Digital Solutions LLC',
      description: 'Consulting Services',
      dueDate: '2025-03-30'
    }
  ]);

  // State for filtering and sorting
  const [filter, setFilter] = useState({
    status: 'all',
    searchTerm: ''
  });

  // State for sorting
  const [sortConfig, setSortConfig] = useState({
    key: 'date',
    direction: 'desc'
  });

  // Function to handle sorting
  const handleSort = (key: keyof typeof invoices[0]) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Function to filter and sort invoices
  const processedInvoices = useMemo(() => {
    let result = [...invoices];

    // Filter by status
    if (filter.status !== 'all') {
      result = result.filter(invoice => invoice.status === filter.status);
    }

    // Filter by search term
    if (filter.searchTerm) {
      const searchTerm = filter.searchTerm.toLowerCase();
      result = result.filter(invoice => 
        invoice.number.toLowerCase().includes(searchTerm) ||
        invoice.client.toLowerCase().includes(searchTerm) ||
        invoice.description.toLowerCase().includes(searchTerm)
      );
    }

    // Sort invoices
    result.sort((a, b) => {
      if (a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return result;
  }, [invoices, filter, sortConfig]);

  // Function to handle invoice actions
  const handleInvoiceAction = (id: number, action: string) => {
    switch(action) {
      case 'view':
        alert(`Viewing details for invoice ${id}`);
        break;
      case 'pay':
        {
          const invoice = invoices.find(inv => inv.id === id);
          if (invoice && invoice.status === 'pending') {
            // Implement payment logic
            const updatedInvoices = invoices.map(inv => 
              inv.id === id ? { ...inv, status: 'paid' } : inv
            );
            setInvoices(updatedInvoices);
            alert(`Paid invoice ${id}`);
          }
        }
        break;
      case 'download':
        alert(`Downloading invoice ${id}`);
        break;
      default:
        break;
    }
  };

  // Calculate invoice statistics
  const invoiceStats = useMemo(() => {
    const totalInvoices = invoices.length;
    const paidInvoices = invoices.filter(inv => inv.status === 'paid').length;
    const pendingInvoices = invoices.filter(inv => inv.status === 'pending').length;
    const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);

    return {
      total: totalInvoices,
      paid: paidInvoices,
      pending: pendingInvoices,
      totalAmount
    };
  }, [invoices]);

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Invoices Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Invoices</p>
            <p className="text-2xl font-bold text-blue-600">{invoiceStats.total}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Paid Invoices</p>
            <p className="text-2xl font-bold text-green-600">{invoiceStats.paid}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Pending Invoices</p>
            <p className="text-2xl font-bold text-yellow-600">{invoiceStats.pending}</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Amount</p>
            <p className="text-2xl font-bold text-purple-600">${invoiceStats.totalAmount.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Invoices & Billing</h2>
          <div className="flex space-x-2">
            {/* Status Filter */}
            <select 
              className="border rounded px-2 py-1"
              value={filter.status}
              onChange={(e) => setFilter(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="all">All Statuses</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="draft">Draft</option>
            </select>

            {/* Search Input */}
            <input 
              type="text" 
              placeholder="Search invoices..."
              className="border rounded px-2 py-1 w-64"
              value={filter.searchTerm}
              onChange={(e) => setFilter(prev => ({ ...prev, searchTerm: e.target.value }))}
            />
          </div>
        </div>
        
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                onClick={() => handleSort('number')}
              >
                Invoice Number 
                {sortConfig.key === 'number' && (
                  <span>{sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}</span>
                )}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                onClick={() => handleSort('date')}
              >
                Date 
                {sortConfig.key === 'date' && (
                  <span>{sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}</span>
                )}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                onClick={() => handleSort('client')}
              >
                Client 
                {sortConfig.key === 'client' && (
                  <span>{sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}</span>
                )}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                onClick={() => handleSort('amount')}
              >
                Amount 
                {sortConfig.key === 'amount' && (
                  <span>{sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}</span>
                )}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {processedInvoices.map(invoice => (
              <tr key={invoice.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {invoice.number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {invoice.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {invoice.client}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${invoice.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 
                    invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button 
                    className="text-blue-600 hover:text-blue-900"
                    onClick={() => handleInvoiceAction(invoice.id, 'view')}
                  >
                    View
                  </button>
                  {invoice.status === 'pending' && (
                    <button 
                      className="text-green-600 hover:text-green-900"
                      onClick={() => handleInvoiceAction(invoice.id, 'pay')}
                    >
                      Pay
                    </button>
                  )}
                  <button 
                    className="text-gray-600 hover:text-gray-900"
                    onClick={() => handleInvoiceAction(invoice.id, 'download')}
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* No Results Handling */}
        {processedInvoices.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No invoices found matching your search criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoices;