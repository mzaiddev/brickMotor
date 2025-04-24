import  { useState } from 'react';
import Invoices from './Invoices';
import PaymentMethods from './PaymentMethod';
import RevenueAndPayouts from './Revenue';
import TransactionHistory from './TransactionHistory';

function PaymentSystem() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  // Sample data
  const pendingPayments = [
    { id: 1, type: 'Monthly Subscription', amount: 2500, dueDate: '2025-03-15', status: 'pending' },
    { id: 2, type: 'Placement Fee', amount: 1200, dueDate: '2025-03-01', status: 'overdue' },
    { id: 3, type: 'Marketing Package', amount: 350, dueDate: '2025-03-15', status: 'pending' }
  ];
  
  const paymentMethods = [
    { id: 1, type: 'Credit Card', last4: '4242', isDefault: true },
    { id: 2, type: 'Bank Account', account: '****6789', isDefault: false },
    { id: 3, type: 'PayPal', email: 'business@example.com', isDefault: false }
  ];
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-600 p-4 text-white">
        <h1 className="text-2xl font-bold">Payment System</h1>
      </header>
      
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white p-4 shadow-md">
          <nav>
            <ul>
              <li className="mb-2">
                <button 
                  className={`w-full text-left p-2 rounded ${activeTab === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  Payment Dashboard
                </button>
              </li>
              <li className="mb-2">
                <button 
                  className={`w-full text-left p-2 rounded ${activeTab === 'invoices' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                  onClick={() => setActiveTab('invoices')}
                >
                  Invoices & Billing
                </button>
              </li>
              <li className="mb-2">
                <button 
                  className={`w-full text-left p-2 rounded ${activeTab === 'methods' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                  onClick={() => setActiveTab('methods')}
                >
                  Payment Methods
                </button>
              </li>
              <li className="mb-2">
                <button 
                  className={`w-full text-left p-2 rounded ${activeTab === 'revenue' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                  onClick={() => setActiveTab('revenue')}
                >
                  Revenue & Payouts
                </button>
              </li>
              <li className="mb-2">
                <button 
                  className={`w-full text-left p-2 rounded ${activeTab === 'history' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                  onClick={() => setActiveTab('history')}
                >
                  Transaction History
                </button>
              </li>
            </ul>
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Payment Dashboard</h2>
                <button 
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => setShowPaymentModal(true)}
                >
                  Make a Payment
                </button>
              </div>
              
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
                  <p className="text-sm text-gray-500">Outstanding Balance</p>
                  <p className="text-2xl font-bold">$4,050.00</p>
                  <p className="mt-2 text-sm text-red-600">1 payment overdue</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
                  <p className="text-sm text-gray-500">Next Payment Due</p>
                  <p className="text-2xl font-bold">$2,850.00</p>
                  <p className="mt-2 text-sm text-gray-500">Due on March 15, 2025</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
                  <p className="text-sm text-gray-500">YTD Payments</p>
                  <p className="text-2xl font-bold">$5,250.00</p>
                  <p className="mt-2 text-sm text-gray-500">All payments up to date</p>
                </div>
              </div>
              
              {/* Pending Payments */}
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h3 className="text-lg font-medium mb-4">Pending Payments</h3>
                
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pendingPayments.map(payment => (
                      <tr key={payment.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${payment.amount.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.dueDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {payment.status === 'pending' ? 'Pending' : 'Overdue'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                          <button 
                            className="text-green-600 hover:text-green-900"
                            onClick={() => setShowPaymentModal(true)}
                          >
                            Pay
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Payment Methods Tab */}
          {activeTab === 'methods' && (
             <PaymentMethods/>
          )}
          
          {/* Placeholders for other tabs */}
          {activeTab === 'invoices' && (
            <Invoices/>
          )}
          
          {activeTab === 'revenue' && (
            <RevenueAndPayouts/>
          )}
          
          {activeTab === 'history' && (
            <TransactionHistory/>
          )}
        </main>
      </div>
      
      {/* Make Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
              <h3 className="text-lg font-medium">Make a Payment</h3>
              <button onClick={() => setShowPaymentModal(false)}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Type</label>
                <select className="w-full border border-gray-300 rounded p-2">
                  <option>Monthly Subscription</option>
                  <option>Placement Fee</option>
                  <option>Marketing Package</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md p-2 border"
                    defaultValue="2,500.00"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select className="w-full border border-gray-300 rounded p-2">
                  <option>Credit Card (****4242)</option>
                  <option>Bank Account (****6789)</option>
                  <option>PayPal (business@example.com)</option>
                </select>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  onClick={() => setShowPaymentModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    alert('Payment processed successfully!');
                    setShowPaymentModal(false);
                  }}
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentSystem;