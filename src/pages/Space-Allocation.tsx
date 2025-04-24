import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RetailSpaceManagement = () => {
  // Tab navigation state
  const [activeTab, setActiveTab] = useState('locations');
  
  // Vendor Storefront Selection states
  const [selectedLocation, setSelectedLocation] = useState(1);
  const [selectedSpaces, setSelectedSpaces] = useState(1);
  const [selectedPosition, setSelectedPosition] = useState<PositionType>('main');
  const [selectedTier, setSelectedTier] = useState<keyof typeof tiers>('mid-range');
  const [businessName, setBusinessName] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Sample data
  const locations = [
    { id: 1, name: 'Downtown Plaza', city: 'New York', state: 'NY', available: 3, total: 5, basePrice: 2500 },
    { id: 2, name: 'Westfield Mall', city: 'Los Angeles', state: 'CA', available: 2, total: 5, basePrice: 2800 },
    { id: 3, name: 'Riverwalk Center', city: 'Chicago', state: 'IL', available: 5, total: 5, basePrice: 2200 },
    { id: 4, name: 'Harbor Shopping Center', city: 'Miami', state: 'FL', available: 1, total: 5, basePrice: 2600 },
    { id: 5, name: 'Mountain View Galleria', city: 'Denver', state: 'CO', available: 4, total: 5, basePrice: 2000 }
  ];
  
  const vendors = [
    { id: 1, name: 'Luxury Timepieces', category: 'Watches', position: 'front', locationId: 1, spaces: 1, tier: 'luxury' },
    { id: 2, name: 'Urban Apparel', category: 'Clothing', position: 'main', locationId: 1, spaces: 1, tier: 'mid-range' }
  ];
  
  type PositionType = 'front' | 'main' | 'side' | 'back';
  
  const positions: Record<PositionType, { name: string; multiplier: number; color: string; activeColor: string }> = {
    front: { name: 'Front', multiplier: 1.8, color: 'bg-red-200', activeColor: 'bg-red-300' },
    main: { name: 'Main Aisle', multiplier: 1.4, color: 'bg-yellow-100', activeColor: 'bg-yellow-200' },
    side: { name: 'Side', multiplier: 1.1, color: 'bg-green-200', activeColor: 'bg-green-300' },
    back: { name: 'Back', multiplier: 0.8, color: 'bg-blue-200', activeColor: 'bg-blue-300' }
  };
  
  const tiers = {
    'basic': { name: 'Basic Products', multiplier: 1.0 },
    'mid-range': { name: 'Mid-Range Products', multiplier: 1.3 },
    'premium': { name: 'Premium Products', multiplier: 1.8 },
    'luxury': { name: 'Luxury Products', multiplier: 2.2 }
  };
  
  // Get current location
  const getCurrentLocation = () => {
    return locations.find(loc => loc.id === selectedLocation) || locations[0];
  };
  
  // Get vendors for current location
  const getVendorsForLocation = (locationId: number) => {
    return vendors.filter(vendor => vendor.locationId === locationId);
  };
  
  // Calculate price
  const calculatePrice = () => {
    const location = getCurrentLocation();
    const basePrice = location.basePrice;
    const positionMultiplier = positions[selectedPosition].multiplier;
    const tierMultiplier = tiers[selectedTier].multiplier;
    
    return (basePrice * selectedSpaces * positionMultiplier * tierMultiplier).toFixed(2);
  };
  
  // Handle reservation submission
  const handleSubmit = () => {
    if (!businessName) {
      alert('Please enter your business name');
      return;
    }
    
    // Simulate processing
    setTimeout(() => {
      setSubmitSuccess(true);
      
      // Reset form after delay
      setTimeout(() => {
        setSubmitSuccess(false);
        setBusinessName('');
        setSelectedSpaces(1);
        setSelectedPosition('main');
        setSelectedTier('mid-range');
      }, 3000);
    }, 1000);
  };
  
  // Filter states
  const [stateFilter, setStateFilter] = useState('All');
  const states = ['All', 'NY', 'CA', 'IL', 'FL', 'CO'];
  
  // For locations tab demo
  const filteredLocations = locations.filter(loc => 
    stateFilter === 'All' || loc.state === stateFilter
  );
  
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">Retail Space Management</h1>
      </header>
      
      {/* Main Content Area with Side Navigation */}
      <div className="flex flex-1 overflow-hidden">
        {/* Side Navigation */}
        <nav className="bg-gray-800 text-white w-64 p-4">
          <ul className="space-y-2">
            <li>
              <button 
                className={`w-full text-left p-2 rounded ${activeTab === 'locations' ? 'bg-blue-500' : 'hover:bg-gray-700'}`}
                onClick={() => setActiveTab('locations')}
              >
                Location Listings
              </button>
            </li>
            <li>
              <button 
                className={`w-full text-left p-2 rounded ${activeTab === 'allocation' ? 'bg-blue-500' : 'hover:bg-gray-700'}`}
                onClick={() => setActiveTab('allocation')}
              >
                Space Allocation
              </button>
            </li>
            <li>
              <button 
                className={`w-full text-left p-2 rounded ${activeTab === 'storefront' ? 'bg-blue-500' : 'hover:bg-gray-700'}`}
                onClick={() => setActiveTab('storefront')}
              >
                Vendor Storefront Selection
              </button>
            </li>
            <li>
              <button 
                className={`w-full text-left p-2 rounded ${activeTab === 'financial' ? 'bg-blue-500' : 'hover:bg-gray-700'}`}
                onClick={() => setActiveTab('financial')}
              >
                Financial Dashboard
              </button>
            </li>
          </ul>
        </nav>
        
        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          {/* Vendor Storefront Selection */}
          {activeTab === 'storefront' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Vendor Storefront Selection</h2>
              
              {/* Success Message */}
              {submitSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-6">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">Reservation successful!</span>
                  </div>
                  <p className="mt-1 text-sm">Your space reservation has been submitted. Our team will contact you shortly.</p>
                </div>
              )}
              
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <div className="p-4 mb-6 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="text-md font-medium text-blue-800 mb-2">Shared Space Model Information</h3>
                  <ul className="list-disc pl-5 text-sm text-blue-700">
                    <li>Each brick and mortar location accommodates a maximum of 5 vendors total</li>
                    <li>Vendors can reserve one space or multiple spaces up to all 5 available spaces</li>
                    <li>Vendor product categories are curated to prevent direct competition</li>
                    <li>Pricing is tiered based on product value and store location</li>
                    <li>Space reservation is subject to management approval</li>
                  </ul>
                </div>
                
                <div className="p-4 mb-6 bg-gray-100 rounded border border-gray-300">
                  <h3 className="text-lg font-medium mb-2">Mall Layout - Storefront Positions</h3>
                  <p className="text-sm text-gray-600 mb-3">Select a position type to see availability and pricing details.</p>
                  
                  <div className="relative w-full h-64 bg-gray-200 rounded overflow-hidden">
                    {/* Simple mall layout visualization */}
                    <div className="absolute inset-0 p-4">
                      {/* Outer border */}
                      <div className="relative border-4 border-gray-400 h-full rounded">
                        {/* Front positions */}
                        <div 
                          className={`absolute top-0 left-0 right-0 h-8 ${selectedPosition === 'front' ? positions.front.activeColor : positions.front.color} flex items-center justify-center text-xs font-bold cursor-pointer`}
                          onClick={() => setSelectedPosition('front')}
                        >
                          FRONT POSITIONS
                        </div>
                        
                        {/* Back positions */}
                        <div 
                          className={`absolute bottom-0 left-0 right-0 h-8 ${selectedPosition === 'back' ? positions.back.activeColor : positions.back.color} flex items-center justify-center text-xs font-bold cursor-pointer`}
                          onClick={() => setSelectedPosition('back')}
                        >
                          BACK POSITIONS
                        </div>
                        
                        {/* Main aisle */}
                        <div 
                          className={`absolute top-8 bottom-8 left-1/2 w-12 -ml-6 ${selectedPosition === 'main' ? positions.main.activeColor : positions.main.color} flex items-center justify-center cursor-pointer`}
                          onClick={() => setSelectedPosition('main')}
                        >
                          <div className="transform rotate-90 whitespace-nowrap text-xs font-bold">MAIN AISLE</div>
                        </div>
                        
                        {/* Side positions */}
                        <div 
                          className={`absolute top-8 bottom-8 left-0 w-8 ${selectedPosition === 'side' ? positions.side.activeColor : positions.side.color} flex items-center justify-center cursor-pointer`}
                          onClick={() => setSelectedPosition('side')}
                        >
                          <div className="transform rotate-90 whitespace-nowrap text-xs font-bold">SIDE</div>
                        </div>
                        <div 
                          className={`absolute top-8 bottom-8 right-0 w-8 ${selectedPosition === 'side' ? positions.side.activeColor : positions.side.color} flex items-center justify-center cursor-pointer`}
                          onClick={() => setSelectedPosition('side')}
                        >
                          <div className="transform rotate-90 whitespace-nowrap text-xs font-bold">SIDE</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">Space Reservation</h3>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Select Store Location</h4>
                    <select 
                      className="w-full border border-gray-300 rounded-md p-2 mb-4"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(parseInt(e.target.value))}
                    >
                      {locations.map(location => (
                        <option key={location.id} value={location.id}>
                          {location.name} ({location.city}, {location.state}) - {location.available} spaces available
                        </option>
                      ))}
                    </select>
                    
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <h5 className="font-medium text-gray-800 mb-2">Location Space Availability</h5>
                      <div className="flex items-center mb-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{width: `${((getCurrentLocation().total - getCurrentLocation().available) / getCurrentLocation().total) * 100}%`}}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">
                          {getCurrentLocation().total - getCurrentLocation().available}/5 spaces occupied
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {getCurrentLocation().available} spaces available for reservation
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-3">Vendor Information</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                          <input 
                            type="text" 
                            className="w-full border border-gray-300 rounded-md p-2" 
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            placeholder="Enter your business name"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Product Category</label>
                          <select className="w-full border border-gray-300 rounded-md p-2">
                            <option>Apparel</option>
                            <option>Accessories</option>
                            <option>Home Goods</option>
                            <option>Electronics</option>
                            <option>Food & Beverage</option>
                            <option>Health & Beauty</option>
                            <option>Other</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Product Value Tier</label>
                          <select 
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={selectedTier}
                            onChange={(e) => setSelectedTier(e.target.value as keyof typeof tiers)}
                          >
                            {Object.entries(tiers).map(([key, tier]) => (
                              <option key={key} value={key}>
                                {tier.name} ({tier.multiplier}x pricing)
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-3">Space Reservation</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Spaces to Reserve</label>
                          <select 
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={selectedSpaces}
                            onChange={(e) => setSelectedSpaces(parseInt(e.target.value))}
                          >
                            {[...Array(Math.min(5, getCurrentLocation().available))].map((_, i) => (
                              <option key={i} value={i + 1}>
                                {i + 1} {i === 0 ? 'Space' : 'Spaces'}{i === 4 ? ' (Entire Location)' : ''}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Position</label>
                          <select 
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={selectedPosition}
                            onChange={(e) => setSelectedPosition(e.target.value as PositionType)}
                          >
                            {Object.entries(positions).map(([key, position]) => (
                              <option key={key} value={key}>
                                {position.name} ({position.multiplier}x pricing)
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Reservation Duration</label>
                          <select className="w-full border border-gray-300 rounded-md p-2">
                            <option>3 Months</option>
                            <option>6 Months</option>
                            <option>1 Year</option>
                            <option>2 Years</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Cost Calculation</h4>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Base Price per Space</p>
                        <p className="text-xl font-semibold">${getCurrentLocation().basePrice}<span className="text-sm font-normal text-gray-500">/month</span></p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Number of Spaces</p>
                        <p className="text-xl font-semibold">{selectedSpaces}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Position Multiplier</p>
                        <p className="text-xl font-semibold">{positions[selectedPosition].multiplier}x <span className="text-sm font-normal text-gray-500">({positions[selectedPosition].name})</span></p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Product Tier Multiplier</p>
                        <p className="text-xl font-semibold">{tiers[selectedTier].multiplier}x <span className="text-sm font-normal text-gray-500">({tiers[selectedTier].name})</span></p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-indigo-700">Monthly Cost</p>
                          <p className="text-xs text-indigo-600">
                            ${getCurrentLocation().basePrice} × {selectedSpaces} space{selectedSpaces > 1 ? 's' : ''} × {positions[selectedPosition].multiplier} position × {tiers[selectedTier].multiplier} tier
                          </p>
                        </div>
                        <p className="text-2xl font-bold text-indigo-700">${calculatePrice()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 justify-end">
                    <button className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                      Save as Draft
                    </button>
                    <button 
                      className={`px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors ${!businessName ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={handleSubmit}
                      disabled={!businessName}
                    >
                      Submit Reservation Request
                    </button>
                  </div>
                </div>
                
                <div className="p-4 mb-6 bg-gray-100 rounded border border-gray-300">
                  <h3 className="text-lg font-medium mb-3">Current Vendor Distribution</h3>
                  <p className="text-sm text-gray-600 mb-3">Space occupancy across {getCurrentLocation().name} ({getCurrentLocation().city}, {getCurrentLocation().state})</p>
                  
                  <div className="bg-white p-4 rounded-lg">
                    <div className="grid grid-cols-5 gap-2 mb-2">
                      {getVendorsForLocation(selectedLocation).map(vendor => (
                        <div 
                          key={vendor.id} 
                          className={`${
                            vendor.tier === 'luxury' ? 'bg-purple-100' : 
                            vendor.tier === 'premium' ? 'bg-blue-100' : 
                            vendor.tier === 'mid-range' ? 'bg-green-100' : 'bg-yellow-100'
                          } rounded-lg p-3 flex flex-col items-center`}
                        >
                          <div className={`h-8 w-8 ${
                            vendor.tier === 'luxury' ? 'bg-purple-500' : 
                            vendor.tier === 'premium' ? 'bg-blue-500' : 
                            vendor.tier === 'mid-range' ? 'bg-green-500' : 'bg-yellow-500'
                          } rounded-full flex items-center justify-center text-white font-bold text-xs mb-2`}>
                            {vendor.name.split(' ').map(word => word[0]).join('')}
                          </div>
                          <p className={`text-xs ${
                            vendor.tier === 'luxury' ? 'text-purple-700' : 
                            vendor.tier === 'premium' ? 'text-blue-700' : 
                            vendor.tier === 'mid-range' ? 'text-green-700' : 'text-yellow-700'
                          } font-medium text-center`}>{vendor.name}</p>
                          <p className={`text-xs ${
                            vendor.tier === 'luxury' ? 'text-purple-600' : 
                            vendor.tier === 'premium' ? 'text-blue-600' : 
                            vendor.tier === 'mid-range' ? 'text-green-600' : 'text-yellow-600'
                          } mt-1`}>{positions[vendor.position].name}</p>
                        </div>
                      ))}
                      
                      {/* Available spaces */}
                      {[...Array(getCurrentLocation().available)].map((_, index) => (
                        <div key={`empty-${index}`} className="bg-gray-100 rounded-lg p-3 flex flex-col items-center border border-dashed border-gray-300">
                          <p className="text-xs text-gray-500 font-medium text-center">Available Space</p>
                          <p className="text-xs text-gray-400 mt-1">Reserve Now</p>
                        </div>
                      ))}
                    </div>
                    
                    <p className="text-xs text-gray-500 text-center mt-2">Note: Vendors with multiple spaces may have positions across different areas</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Location Listings (placeholder) */}
          {activeTab === 'locations' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Location Listings</h2>
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <p className="text-center text-gray-500">Location listings module</p>
              </div>
            </div>
          )}
          
          {/* Space Allocation (placeholder) */}
          {activeTab === 'allocation' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Space Allocation</h2>
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <p className="text-center text-gray-500">Space allocation module</p>
              </div>
            </div>
          )}
          
          {/* Financial Dashboard (placeholder) */}
          {activeTab === 'financial' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Financial Dashboard</h2>
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <p className="text-center text-gray-500">Financial dashboard module</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RetailSpaceManagement;