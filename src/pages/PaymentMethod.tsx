import React, { useState } from 'react';

const PaymentMethods = () => {
  // Initial payment methods with more detailed information
  const [paymentMethods, setPaymentMethods] = useState([
    { 
      id: 1, 
      type: 'Credit Card', 
      last4: '4242', 
      brand: 'Visa',
      expiryDate: '12/2026',
      isDefault: true,
      cardHolder: 'John Doe'
    },
    { 
      id: 2, 
      type: 'Bank Account', 
      account: '****6789', 
      bankName: 'Chase Bank',
      accountType: 'Checking',
      isDefault: false
    },
    { 
      id: 3, 
      type: 'PayPal', 
      email: 'business@example.com', 
      isDefault: false
    }
  ]);

  // State for modal visibility and form
  const [isAddMethodModalOpen, setIsAddMethodModalOpen] = useState(false);
  const [isEditMethodModalOpen, setIsEditMethodModalOpen] = useState(false);
  const [currentMethod, setCurrentMethod] = useState(null);

  // State for new payment method form
  const [newMethod, setNewMethod] = useState({
    type: '',
    details: {
      cardNumber: '',
      cardBrand: '',
      expiryMonth: '',
      expiryYear: '',
      cardHolder: '',
      accountNumber: '',
      bankName: '',
      accountType: '',
      email: ''
    }
  });

  // Handle setting default payment method
  const handleSetDefaultMethod = (methodId) => {
    const updatedMethods = paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === methodId
    }));

    setPaymentMethods(updatedMethods);
  };

  // Handle removing a payment method
  const handleRemoveMethod = (methodId: number) => {
    // Prevent removing the last payment method or the default method
    if (
      paymentMethods.length > 1 && 
      !(paymentMethods.find(m => m.id === methodId)?.isDefault)
    ) {
      const updatedMethods = paymentMethods.filter(method => method.id !== methodId);
      setPaymentMethods(updatedMethods);
    } else {
      alert('Cannot remove the last or default payment method');
    }
  };

  // Open edit method modal
  const handleEditMethod = (method) => {
    setCurrentMethod(method);
    setIsEditMethodModalOpen(true);
  };

  // Handle adding a new payment method
  const handleAddPaymentMethod = (e) => {
    e.preventDefault();
    
    // Validate input based on method type
    if (!newMethod.type) {
      alert('Please select a payment method type');
      return;
    }

    // Create new method object
    const method = {
      id: paymentMethods.length + 1,
      type: newMethod.type,
      isDefault: false,
      ...(newMethod.type === 'Credit Card' ? {
        last4: newMethod.details.cardNumber.slice(-4),
        brand: newMethod.details.cardBrand,
        expiryDate: `${newMethod.details.expiryMonth}/${newMethod.details.expiryYear}`,
        cardHolder: newMethod.details.cardHolder
      } : newMethod.type === 'Bank Account' ? {
        account: `****${newMethod.details.accountNumber.slice(-4)}`,
        bankName: newMethod.details.bankName,
        accountType: newMethod.details.accountType
      } : {
        email: newMethod.details.email
      })
    };

    // Add new method
    setPaymentMethods([...paymentMethods, method]);
    
    // Reset form and close modal
    setNewMethod({ type: '', details: {} });
    setIsAddMethodModalOpen(false);
  };

  // Render payment method icon based on type
  const renderMethodIcon = (method) => {
    switch(method.type) {
      case 'Credit Card':
        return <i className="fas fa-credit-card text-blue-500"></i>;
      case 'Bank Account':
        return <i className="fas fa-university text-green-500"></i>;
      case 'PayPal':
        return <i className="fab fa-paypal text-indigo-500"></i>;
      default:
        return null;
    }
  };

  // Render method details
  const renderMethodDetails = (method) => {
    switch(method.type) {
      case 'Credit Card':
        return `${method.brand} **** ${method.last4} (Exp: ${method.expiryDate})`;
      case 'Bank Account':
        return `${method.bankName} ${method.account}`;
      case 'PayPal':
        return method.email;
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment Methods Summary */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Payment Methods</h2>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setIsAddMethodModalOpen(true)}
          >
            Add Payment Method
          </button>
        </div>

        {/* Payment Methods List */}
        <div className="space-y-4">
          {paymentMethods.map(method => (
            <div 
              key={method.id} 
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition"
            >
              <div className="flex items-center space-x-4">
                {renderMethodIcon(method)}
                <div>
                  <p className="font-medium">{method.type}</p>
                  <p className="text-sm text-gray-500">
                    {renderMethodDetails(method)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {method.isDefault ? (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Default
                  </span>
                ) : (
                  <button 
                    className="text-blue-600 hover:text-blue-900"
                    onClick={() => handleSetDefaultMethod(method.id)}
                  >
                    Set as Default
                  </button>
                )}
                
                <button 
                  className="text-gray-600 hover:text-gray-900"
                  onClick={() => handleEditMethod(method)}
                >
                  Edit
                </button>
                
                <button 
                  className="text-red-600 hover:text-red-900"
                  onClick={() => handleRemoveMethod(method.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Payment Method Modal */}
      {isAddMethodModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Add Payment Method</h3>
            
            <form onSubmit={handleAddPaymentMethod}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method Type
                </label>
                <select 
                  className="w-full border rounded p-2"
                  value={newMethod.type}
                  onChange={(e) => setNewMethod({ 
                    type: e.target.value, 
                    details: {} 
                  })}
                  required
                >
                  <option value="">Select Payment Method</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Bank Account">Bank Account</option>
                  <option value="PayPal">PayPal</option>
                </select>
              </div>

              {/* Conditional Form Fields Based on Method Type */}
              {newMethod.type === 'Credit Card' && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input 
                      type="text" 
                      className="w-full border rounded p-2"
                      placeholder="1234 5678 9012 3456"
                      required
                      onChange={(e) => setNewMethod(prev => ({
                        ...prev,
                        details: {
                          ...prev.details,
                          cardNumber: e.target.value
                        }
                      }))}
                    />
                  </div>
                  {/* More Credit Card Fields */}
                </>
              )}

              {/* Similar conditional rendering for Bank Account and PayPal */}
              
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  onClick={() => setIsAddMethodModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Add Payment Method
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Payment Method Modal - Similar to Add Modal but pre-filled */}
      {isEditMethodModalOpen && currentMethod && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Edit Payment Method</h3>
            
            <p className="text-center text-gray-500 mb-4">
              Editing functionality to be implemented
            </p>
            
            <div className="flex justify-end space-x-3">
              <button 
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => setIsEditMethodModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;