import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RetailSpaceManagement = () => {
  // Navigation state
  const [activeTab, setActiveTab] = useState('locations');
  
  // Sample data for different modules
  const [locations, ] = useState([
    { id: 1, name: 'Downtown Plaza', city: 'New York', state: 'NY', availability: 5, sqFt: 1200, pricePerSqFt: 45 },
    { id: 2, name: 'Westfield Mall', city: 'Los Angeles', state: 'CA', availability: 3, sqFt: 950, pricePerSqFt: 52 },
    { id: 3, name: 'Riverwalk Center', city: 'Chicago', state: 'IL', availability: 7, sqFt: 1050, pricePerSqFt: 38 },
    { id: 4, name: 'Harbor Shopping Center', city: 'Miami', state: 'FL', availability: 2, sqFt: 1500, pricePerSqFt: 50 },
    { id: 5, name: 'Mountain View Galleria', city: 'Denver', state: 'CO', availability: 9, sqFt: 850, pricePerSqFt: 32 },
  ]);
  
  // Financial data for dashboard
  const [financialData,] = useState({
    monthlyFees: [
      { name: 'Jan', rent: 5200, branding: 800, utilities: 1200, misc: 300 },
      { name: 'Feb', rent: 5200, branding: 950, utilities: 1150, misc: 250 },
      { name: 'Mar', rent: 5200, branding: 1100, utilities: 1300, misc: 350 },
      { name: 'Apr', rent: 5500, branding: 1200, utilities: 1250, misc: 300 },
      { name: 'May', rent: 5500, branding: 1350, utilities: 1400, misc: 400 },
      { name: 'Jun', rent: 5500, branding: 1500, utilities: 1500, misc: 350 },
      { name: 'Jul', rent: 5800, branding: 1600, utilities: 1600, misc: 450 },
      { name: 'Aug', rent: 5800, branding: 1700, utilities: 1550, misc: 400 },
      { name: 'Sep', rent: 5800, branding: 1800, utilities: 1450, misc: 300 },
      { name: 'Oct', rent: 6000, branding: 1900, utilities: 1500, misc: 350 },
      { name: 'Nov', rent: 6000, branding: 2000, utilities: 1600, misc: 400 },
      { name: 'Dec', rent: 6000, branding: 2100, utilities: 1700, misc: 450 },
    ],
    revenue: [
      { name: 'Jan', sales: 14000, transactions: 328 },
      { name: 'Feb', sales: 15200, transactions: 345 },
      { name: 'Mar', sales: 16800, transactions: 376 },
      { name: 'Apr', sales: 18200, transactions: 402 },
      { name: 'May', sales: 19500, transactions: 431 },
      { name: 'Jun', sales: 21000, transactions: 457 },
      { name: 'Jul', sales: 22800, transactions: 488 },
      { name: 'Aug', sales: 24200, transactions: 512 },
      { name: 'Sep', sales: 25500, transactions: 536 },
      { name: 'Oct', sales: 27000, transactions: 563 },
      { name: 'Nov', sales: 28500, transactions: 594 },
      { name: 'Dec', sales: 31000, transactions: 638 },
    ],
    transactionFees: {
      standard: 0.029,
      premium: 0.025,
      enterprise: 0.022,
      monthly: [
        { month: 'Jan', fees: 406 },
        { month: 'Feb', fees: 440 },
        { month: 'Mar', fees: 487 },
        { month: 'Apr', fees: 527 },
        { month: 'May', fees: 565 },
        { month: 'Jun', fees: 609 },
        { month: 'Jul', fees: 661 },
        { month: 'Aug', fees: 702 },
        { month: 'Sep', fees: 739 },
        { month: 'Oct', fees: 783 },
        { month: 'Nov', fees: 826 },
        { month: 'Dec', fees: 899 },
      ],
    },
    placementFees: [
      { location: 'Front', fee: 1200 },
      { location: 'Main Aisle', fee: 950 },
      { location: 'Side', fee: 700 },
      { location: 'Back', fee: 500 },
    ],
    additionalFees: [
      { type: 'Marketing Package', fee: 350, isMonthly: true },
      { type: 'Premium Signage', fee: 250, isMonthly: true },
      { type: 'Setup Fee', fee: 1500, isMonthly: false },
      { type: 'Maintenance', fee: 200, isMonthly: true },
      { type: 'Security Deposit', fee: 3000, isMonthly: false },
    ],
    profitLoss: [
      { name: 'Jan', revenue: 14000, expenses: 7500, profit: 6500 },
      { name: 'Feb', revenue: 15200, expenses: 7550, profit: 7650 },
      { name: 'Mar', revenue: 16800, expenses: 7950, profit: 8850 },
      { name: 'Apr', revenue: 18200, expenses: 8250, profit: 9950 },
      { name: 'May', revenue: 19500, expenses: 8650, profit: 10850 },
      { name: 'Jun', revenue: 21000, expenses: 8850, profit: 12150 },
      { name: 'Jul', revenue: 22800, expenses: 9450, profit: 13350 },
      { name: 'Aug', revenue: 24200, expenses: 9450, profit: 14750 },
      { name: 'Sep', revenue: 25500, expenses: 9350, profit: 16150 },
      { name: 'Oct', revenue: 27000, expenses: 9750, profit: 17250 },
      { name: 'Nov', revenue: 28500, expenses: 10000, profit: 18500 },
      { name: 'Dec', revenue: 31000, expenses: 10250, profit: 20750 },
    ],
    yearlyTotals: {
      revenue: 264700,
      expenses: 107000,
      profit: 157700,
    }
  });
  
  const [spaceAllocation, ] = useState([
    { 
      id: 1, 
      name: 'Standard Space', 
      maxVendors: 3, 
      sqFt: 400, 
      basePrice: 1200, 
      sharedAmenities: ['Power', 'WiFi', 'Security', 'Shared Storage'],
      productTiers: [
        { name: 'Basic Products', valueMultiplier: 1.0, description: 'For everyday items, accessories, or low-cost goods' },
        { name: 'Mid-Range Products', valueMultiplier: 1.3, description: 'For specialty items or moderately priced merchandise' },
        { name: 'Premium Products', valueMultiplier: 1.8, description: 'For high-end or luxury products with higher value' }
      ],
      availableSpaces: 2,
      currentVendors: [
        { name: 'Handmade Crafts Co.', productCategory: 'Artisanal Crafts', productTier: 'Mid-Range Products' }
      ]
    },
    { 
      id: 2, 
      name: 'Featured Space', 
      maxVendors: 5, 
      sqFt: 800, 
      basePrice: 2500, 
      sharedAmenities: ['Power', 'WiFi', 'Security', 'Dedicated Storage', 'Staff Break Area'],
      productTiers: [
        { name: 'Basic Products', valueMultiplier: 1.0, description: 'For everyday items, accessories, or low-cost goods' },
        { name: 'Mid-Range Products', valueMultiplier: 1.4, description: 'For specialty items or moderately priced merchandise' },
        { name: 'Premium Products', valueMultiplier: 2.0, description: 'For high-end or luxury products with higher value' }
      ],
      availableSpaces: 3,
      currentVendors: [
        { name: 'Urban Apparel', productCategory: 'Clothing', productTier: 'Mid-Range Products' },
        { name: 'Tech Gadgets Inc.', productCategory: 'Electronics', productTier: 'Premium Products' }
      ]
    },
    { 
      id: 3, 
      name: 'Premium Space', 
      maxVendors: 5, 
      sqFt: 1200, 
      basePrice: 4000, 
      sharedAmenities: ['Power', 'WiFi', 'Security', 'Private Storage', 'Staff Lounge', 'Meeting Room', 'Premium Fixtures'],
      productTiers: [
        { name: 'Mid-Range Products', valueMultiplier: 1.2, description: 'For specialty items or moderately priced merchandise' },
        { name: 'Premium Products', valueMultiplier: 1.5, description: 'For high-end or luxury products with higher value' },
        { name: 'Luxury Products', valueMultiplier: 2.2, description: 'For exclusive, high-value luxury merchandise' }
      ],
      availableSpaces: 3,
      currentVendors: [
        { name: 'Luxury Timepieces', productCategory: 'Watches', productTier: 'Luxury Products' },
        { name: 'Gourmet Delights', productCategory: 'Food & Beverage', productTier: 'Premium Products' }
      ]
    },
  ]);
  
  const [storefrontOptions,] = useState([
    { 
      id: 1, 
      position: 'Front', 
      visibility: 'High', 
      trafficFlow: 'Heavy', 
      priceMultiplier: 1.8, 
      availability: 2,
      bestFor: 'Luxury, trending, or high-margin items requiring maximum visibility',
      currentOccupants: [
        { vendorName: 'Luxury Timepieces', productCategory: 'Watches', productValue: 'High' }
      ]
    },
    { 
      id: 2, 
      position: 'Main Aisle', 
      visibility: 'Medium-High', 
      trafficFlow: 'Medium-Heavy', 
      priceMultiplier: 1.4, 
      availability: 3,
      bestFor: 'Popular items appealing to broad customer base',
      currentOccupants: [
        { vendorName: 'Tech Gadgets Inc.', productCategory: 'Electronics', productValue: 'High' },
        { vendorName: 'Urban Apparel', productCategory: 'Clothing', productValue: 'Medium' }
      ]
    },
    { 
      id: 3, 
      position: 'Side', 
      visibility: 'Medium', 
      trafficFlow: 'Medium', 
      priceMultiplier: 1.1, 
      availability: 4,
      bestFor: 'Complementary products or specialty items with dedicated customer base',
      currentOccupants: [
        { vendorName: 'Handmade Crafts Co.', productCategory: 'Artisanal Crafts', productValue: 'Medium' }
      ]
    },
    { 
      id: 4, 
      position: 'Back', 
      visibility: 'Low', 
      trafficFlow: 'Light', 
      priceMultiplier: 0.8, 
      availability: 5,
      bestFor: 'Destination products or lower-margin items that don\'t rely on impulse purchases',
      currentOccupants: []
    },
  ]);
  
  // Filter states
  const [stateFilter, setStateFilter] = useState('All');
  const states = ['All', 'NY', 'CA', 'IL', 'FL', 'CO'];
  
  // Filtered locations based on state selection
  const filteredLocations = stateFilter === 'All' 
    ? locations 
    : locations.filter(loc => loc.state === stateFilter);
  
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 shadow-md">
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
          {/* Location Listings */}
          {activeTab === 'locations' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Location Listings</h2>
                <div className="flex items-center space-x-2">
                  <span>Filter by State:</span>
                  <select 
                    className="border rounded p-1"
                    value={stateFilter}
                    onChange={(e) => setStateFilter(e.target.value)}
                  >
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-64 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
                    <div className="absolute inset-0 bg-opacity-60 bg-black flex items-center justify-center">
                      <div className="text-center text-white p-4">
                        <h3 className="text-xl font-bold">Interactive Map</h3>
                        <p className="text-sm opacity-80 mt-2">Click on regions to view available retail spaces</p>
                      </div>
                    </div>
                    
                    {/* Simplified US Map with Interactive Regions */}
                    <svg 
                      viewBox="0 0 960 600" 
                      className="absolute inset-0 w-full h-full opacity-30"
                    >
                      {/* Northeast */}
                      <path 
                        d="M880,140 L830,110 L800,190 L840,220 L890,180 Z" 
                        fill={stateFilter === 'NY' ? '#FFFFFF' : '#4299e1'} 
                        stroke="#FFFFFF" 
                        strokeWidth="2"
                        onClick={() => setStateFilter('NY')}
                        style={{cursor: 'pointer'}}
                      />
                      
                      {/* West Coast */}
                      <path 
                        d="M70,150 L100,250 L180,280 L150,180 Z" 
                        fill={stateFilter === 'CA' ? '#FFFFFF' : '#4299e1'} 
                        stroke="#FFFFFF" 
                        strokeWidth="2"
                        onClick={() => setStateFilter('CA')}
                        style={{cursor: 'pointer'}}
                      />
                      
                      {/* Midwest */}
                      <path 
                        d="M500,200 L580,190 L590,260 L520,280 Z" 
                        fill={stateFilter === 'IL' ? '#FFFFFF' : '#4299e1'} 
                        stroke="#FFFFFF" 
                        strokeWidth="2"
                        onClick={() => setStateFilter('IL')}
                        style={{cursor: 'pointer'}}
                      />
                      
                      {/* South */}
                      <path 
                        d="M700,390 L760,370 L780,420 L740,450 Z" 
                        fill={stateFilter === 'FL' ? '#FFFFFF' : '#4299e1'} 
                        stroke="#FFFFFF" 
                        strokeWidth="2"
                        onClick={() => setStateFilter('FL')}
                        style={{cursor: 'pointer'}}
                      />
                      
                      {/* Mountain */}
                      <path 
                        d="M300,270 L380,250 L400,330 L320,340 Z" 
                        fill={stateFilter === 'CO' ? '#FFFFFF' : '#4299e1'} 
                        stroke="#FFFFFF" 
                        strokeWidth="2"
                        onClick={() => setStateFilter('CO')}
                        style={{cursor: 'pointer'}}
                      />
                    </svg>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-3">Top Retail Markets</h3>
                    <div className="space-y-2">
                      {states.filter(s => s !== 'All').map(state => (
                        <div 
                          key={state} 
                          className={`p-2 rounded-md cursor-pointer transition-all ${stateFilter === state ? 'bg-blue-100 border-l-4 border-blue-500' : 'hover:bg-gray-50'}`}
                          onClick={() => setStateFilter(state)}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <span className={`h-3 w-3 rounded-full mr-2 ${stateFilter === state ? 'bg-blue-500' : 'bg-gray-300'}`}></span>
                              <span className="font-medium">{
                                state === 'NY' ? 'New York' :
                                state === 'CA' ? 'California' :
                                state === 'IL' ? 'Illinois' :
                                state === 'FL' ? 'Florida' :
                                state === 'CO' ? 'Colorado' : state
                              }</span>
                            </div>
                            <span className="text-sm text-gray-500">
                              {locations.filter(loc => loc.state === state).length} locations
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-4 border-b">
                    <h3 className="font-medium text-gray-900">
                      {stateFilter === 'All' ? 'All Locations' : `Locations in ${
                        stateFilter === 'NY' ? 'New York' :
                        stateFilter === 'CA' ? 'California' :
                        stateFilter === 'IL' ? 'Illinois' :
                        stateFilter === 'FL' ? 'Florida' :
                        stateFilter === 'CO' ? 'Colorado' : stateFilter
                      }`}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {filteredLocations.length} retail spaces available
                    </p>
                  </div>
                  
                  <div className="p-4 grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
                    {filteredLocations.map(location => (
                      <div 
                        key={location.id} 
                        className="bg-gray-50 rounded-lg p-4 transform transition-all hover:scale-105 hover:shadow-md"
                      >
                        <div className="flex justify-between">
                          <h4 className="font-medium text-indigo-700">{location.name}</h4>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                            <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span>
                            {location.availability} Spaces
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-500 mt-1">
                          {location.city}, {location.state}
                        </p>
                        
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          <div className="bg-white p-2 rounded border border-gray-100">
                            <p className="text-xs text-gray-500">Size</p>
                            <p className="font-medium">{location.sqFt} sq.ft.</p>
                          </div>
                          <div className="bg-white p-2 rounded border border-gray-100">
                            <p className="text-xs text-gray-500">Price</p>
                            <p className="font-medium">${location.pricePerSqFt}/sq.ft.</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex space-x-2">
                          <button className="flex-1 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm">
                            View Space
                          </button>
                          <button className="w-10 bg-gray-100 text-gray-700 rounded-md flex items-center justify-center hover:bg-gray-200 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-medium text-gray-900 mb-4">Location Details</h3>
                
                <div className="overflow-hidden rounded-lg bg-gradient-to-r from-indigo-50 to-blue-50 p-1">
                  <div className="bg-white rounded-md">
                    <div className="flex flex-wrap border-b">
                      <div className="w-full md:w-1/2 lg:w-1/4 p-4 border-r">
                        <h4 className="text-sm font-medium text-gray-500">Visibility Score</h4>
                        <div className="flex items-center mt-2">
                          <div className="h-2 bg-indigo-500 w-3/4 rounded-l"></div>
                          <div className="h-2 bg-gray-200 w-1/4 rounded-r"></div>
                        </div>
                        <p className="text-sm mt-1 text-right">75%</p>
                      </div>
                      
                      <div className="w-full md:w-1/2 lg:w-1/4 p-4 border-r">
                        <h4 className="text-sm font-medium text-gray-500">Foot Traffic</h4>
                        <div className="flex items-center mt-2">
                          <div className="h-2 bg-green-500 w-4/5 rounded-l"></div>
                          <div className="h-2 bg-gray-200 w-1/5 rounded-r"></div>
                        </div>
                        <p className="text-sm mt-1 text-right">80%</p>
                      </div>
                      
                      <div className="w-full md:w-1/2 lg:w-1/4 p-4 border-r">
                        <h4 className="text-sm font-medium text-gray-500">Vendor Success Rate</h4>
                        <div className="flex items-center mt-2">
                          <div className="h-2 bg-blue-500 w-4/5 rounded-l"></div>
                          <div className="h-2 bg-gray-200 w-1/5 rounded-r"></div>
                        </div>
                        <p className="text-sm mt-1 text-right">85%</p>
                      </div>
                      
                      <div className="w-full md:w-1/2 lg:w-1/4 p-4">
                        <h4 className="text-sm font-medium text-gray-500">Space Utilization</h4>
                        <div className="flex items-center mt-2">
                          <div className="h-2 bg-purple-500 w-3/5 rounded-l"></div>
                          <div className="h-2 bg-gray-200 w-2/5 rounded-r"></div>
                        </div>
                        <p className="text-sm mt-1 text-right">60%</p>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="col-span-1">
                          <h4 className="text-sm font-medium text-gray-900 mb-3">Available Space Types</h4>
                          <div className="space-y-2">
                            {['Standard Space', 'Featured Space', 'Premium Space'].map((type, idx) => (
                              <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <span className="text-sm">{type}</span>
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                  {idx === 0 ? 2 : idx === 1 ? 3 : 1} available
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="col-span-2">
                          <h4 className="text-sm font-medium text-gray-900 mb-3">Vendor Mix by Category</h4>
                          <div className="h-40">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={[
                                    { name: 'Apparel', value: 35 },
                                    { name: 'Accessories', value: 20 },
                                    { name: 'Home Goods', value: 15 },
                                    { name: 'Electronics', value: 10 },
                                    { name: 'Food & Beverage', value: 15 },
                                    { name: 'Other', value: 5 },
                                  ]}
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={60}
                                  fill="#8884d8"
                                  dataKey="value"
                                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                  {[
                                    { name: 'Apparel', value: 35 },
                                    { name: 'Accessories', value: 20 },
                                    { name: 'Home Goods', value: 15 },
                                    { name: 'Electronics', value: 10 },
                                    { name: 'Food & Beverage', value: 15 },
                                    { name: 'Other', value: 5 },
                                  ].map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'][index % 6]} />
                                  ))}
                                </Pie>
                                <Tooltip />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Space Allocation */}
          {activeTab === 'allocation' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Space Allocation</h2>
              
              <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="text-md font-medium text-blue-800 mb-2">Shared Space Model Information</h3>
                <ul className="list-disc pl-5 text-sm text-blue-700">
                  <li>Each location accommodates a maximum of 5 vendors to ensure optimal space utilization</li>
                  <li>Vendor product categories are carefully curated to prevent direct competition</li>
                  <li>Pricing is tiered based on product value (Basic, Mid-Range, Premium, Luxury) and store location</li>
                  <li>Prime locations (Front, Main Aisle) command higher fees suitable for high-value merchandise</li>
                  <li>Vendors can reserve all available spaces within their category allocation</li>
                </ul>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {spaceAllocation.map((space) => (
                  <div key={space.id} className="bg-white p-6 rounded-lg shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-medium text-gray-900">{space.name}</h3>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {space.availableSpaces}/{space.maxVendors} Available
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-500 mb-4">
                      <p><span className="font-medium">Size:</span> {space.sqFt} sq. ft.</p>
                      <p><span className="font-medium">Base Price:</span> ${space.basePrice}/month</p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">Shared Amenities:</h4>
                      <ul className="text-sm text-gray-500 list-disc pl-5">
                        {space.sharedAmenities.map((amenity, index) => (
                          <li key={index}>{amenity}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Product Value Tiers:</h4>
                      <div className="space-y-2">
                        {space.productTiers.map((tier, index) => (
                          <div key={index} className="border rounded p-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">{tier.name}</span>
                              <span className="text-sm text-blue-600">{tier.valueMultiplier}x base price</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{tier.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {space.currentVendors.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Current Vendors:</h4>
                        <ul className="text-sm text-gray-500">
                          {space.currentVendors.map((vendor, index) => (
                            <li key={index} className="mb-1 pb-1 border-b border-gray-100">
                              <div className="flex justify-between">
                                <span>{vendor.name}</span>
                                <span className="text-xs text-gray-400">{vendor.productCategory}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        Reserve Space
                      </button>
                      <button className="flex-1 bg-gray-100 text-gray-800 py-2 rounded hover:bg-gray-200">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Vendor Storefront Selection */}
          {activeTab === 'storefront' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Vendor Storefront Selection</h2>
              
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <div className="p-4 mb-6 bg-gray-100 rounded border border-gray-300">
                  <h3 className="text-lg font-medium mb-2">Mall Layout - Storefront Positions</h3>
                  <p className="text-sm text-gray-600 mb-3">Select a position type to see availability and pricing details.</p>
                  
                  <div className="relative w-full h-64 bg-gray-200 rounded overflow-hidden">
                    {/* Simple mall layout visualization */}
                    <div className="absolute inset-0 p-4">
                      {/* Outer border */}
                      <div className="relative border-4 border-gray-400 h-full rounded">
                        {/* Front positions */}
                        <div className="absolute top-0 left-0 right-0 h-8 bg-red-200 flex items-center justify-center text-xs font-bold">
                          FRONT POSITIONS
                        </div>
                        
                        {/* Back positions */}
                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-blue-200 flex items-center justify-center text-xs font-bold">
                          BACK POSITIONS
                        </div>
                        
                        {/* Main aisle */}
                        <div className="absolute top-8 bottom-8 left-1/2 w-12 -ml-6 bg-yellow-100 flex items-center justify-center">
                          <div className="transform rotate-90 whitespace-nowrap text-xs font-bold">MAIN AISLE</div>
                        </div>
                        
                        {/* Side positions */}
                        <div className="absolute top-8 bottom-8 left-0 w-8 bg-green-200 flex items-center justify-center">
                          <div className="transform rotate-90 whitespace-nowrap text-xs font-bold">SIDE</div>
                        </div>
                        <div className="absolute top-8 bottom-8 right-0 w-8 bg-green-200 flex items-center justify-center">
                          <div className="transform rotate-90 whitespace-nowrap text-xs font-bold">SIDE</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="text-md font-medium text-blue-800 mb-2">Location Impact on Pricing</h3>
                  <p className="text-sm text-blue-700 mb-2">Store locations are priced according to visibility and customer traffic. Vendors with higher-value products are encouraged to consider premium positions to maximize sales potential.</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {storefrontOptions.map((option) => (
                    <div key={option.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-medium">{option.position} Position</h4>
                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                          option.availability === 0 
                            ? 'bg-red-100 text-red-800' 
                            : option.availability <= 2 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-green-100 text-green-800'
                        }`}>
                          {option.availability} Available
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="bg-gray-50 p-2 rounded">
                          <p className="text-xs text-gray-500">Visibility</p>
                          <p className="font-medium">{option.visibility}</p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                          <p className="text-xs text-gray-500">Traffic Flow</p>
                          <p className="font-medium">{option.trafficFlow}</p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                          <p className="text-xs text-gray-500">Price Multiplier</p>
                          <p className="font-medium text-blue-700">{option.priceMultiplier}x base price</p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                          <p className="text-xs text-gray-500">Best For</p>
                          <p className="font-medium text-xs">{option.bestFor}</p>
                        </div>
                      </div>
                      
                      {option.currentOccupants.length > 0 && (
                        <div className="mb-4">
                          <h5 className="text-sm font-medium mb-2">Current Vendors:</h5>
                          <div className="space-y-2">
                            {option.currentOccupants.map((occupant, idx) => (
                              <div key={idx} className="flex justify-between items-center bg-gray-50 p-2 rounded text-sm">
                                <span>{occupant.vendorName}</span>
                                <div className="flex items-center">
                                  <span className="text-xs text-gray-500 mr-2">{occupant.productCategory}</span>
                                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                                    occupant.productValue === 'High' 
                                      ? 'bg-purple-100 text-purple-800' 
                                      : occupant.productValue === 'Medium'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-green-100 text-green-800'
                                  }`}>
                                    {occupant.productValue} Value
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex space-x-2 mt-3">
                        <button 
                          className={`flex-1 py-2 rounded text-white ${
                            option.availability > 0 
                              ? 'bg-blue-600 hover:bg-blue-700' 
                              : 'bg-gray-400 cursor-not-allowed'
                          }`}
                          disabled={option.availability === 0}
                        >
                          Reserve Location
                        </button>
                        <button className="px-3 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="text-md font-medium mb-3">Location Pricing Calculator</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Space Type</label>
                      <select className="w-full border border-gray-300 rounded-md p-2 text-sm">
                        <option>Standard Space ($1,200/mo)</option>
                        <option>Featured Space ($2,500/mo)</option>
                        <option>Premium Space ($4,000/mo)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product Value Tier</label>
                      <select className="w-full border border-gray-300 rounded-md p-2 text-sm">
                        <option>Basic Products (1.0x)</option>
                        <option>Mid-Range Products (1.3x)</option>
                        <option>Premium Products (1.8x)</option>
                        <option>Luxury Products (2.2x)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Store Location</label>
                      <select className="w-full border border-gray-300 rounded-md p-2 text-sm">
                        <option>Front (1.8x)</option>
                        <option>Main Aisle (1.4x)</option>
                        <option>Side (1.1x)</option>
                        <option>Back (0.8x)</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 p-3 rounded">
                    <span className="font-medium">Estimated Monthly Cost:</span>
                    <span className="text-xl font-bold text-blue-700">$3,024.00</span>
                  </div>
                  <div className="mt-3 text-xs text-gray-500">
                    <p>Cost calculation: Base price × Product value multiplier × Location multiplier</p>
                    <p>Example: $1,200 × 1.4 × 1.8 = $3,024.00</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Financial Dashboard */}
          {activeTab === 'financial' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Financial Dashboard</h2>
              
              {/* Monthly & Yearly Fees Breakdown */}
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h3 className="text-lg font-medium mb-4">Monthly & Yearly Fees Breakdown</h3>
                
                <div className="h-64 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={financialData.monthlyFees}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value}`, '']} />
                      <Legend />
                      <Bar dataKey="rent" name="Rent" fill="#8884d8" />
                      <Bar dataKey="branding" name="Branding" fill="#82ca9d" />
                      <Bar dataKey="utilities" name="Utilities" fill="#ffc658" />
                      <Bar dataKey="misc" name="Miscellaneous" fill="#ff8042" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-purple-100 p-4 rounded">
                    <h4 className="text-sm font-medium text-purple-800">Total Rent</h4>
                    <p className="text-2xl font-bold text-purple-700">
                      ${financialData.monthlyFees.reduce((sum, month) => sum + month.rent, 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-green-100 p-4 rounded">
                    <h4 className="text-sm font-medium text-green-800">Total Branding</h4>
                    <p className="text-2xl font-bold text-green-700">
                      ${financialData.monthlyFees.reduce((sum, month) => sum + month.branding, 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-yellow-100 p-4 rounded">
                    <h4 className="text-sm font-medium text-yellow-800">Total Utilities</h4>
                    <p className="text-2xl font-bold text-yellow-700">
                      ${financialData.monthlyFees.reduce((sum, month) => sum + month.utilities, 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-orange-100 p-4 rounded">
                    <h4 className="text-sm font-medium text-orange-800">Total Misc</h4>
                    <p className="text-2xl font-bold text-orange-700">
                      ${financialData.monthlyFees.reduce((sum, month) => sum + month.misc, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Revenue & Sales Monitoring */}
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h3 className="text-lg font-medium mb-4">Revenue & Sales Monitoring</h3>
                
                <div className="h-64 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={financialData.revenue}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip formatter={(value, name) => [name === 'sales' ? `${value.toLocaleString()}` : value, name === 'sales' ? 'Sales' : 'Transactions']} />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="sales" name="Sales ($)" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line yAxisId="right" type="monotone" dataKey="transactions" name="Transactions" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-indigo-100 p-4 rounded">
                    <h4 className="text-sm font-medium text-indigo-800">Total Annual Sales</h4>
                    <p className="text-2xl font-bold text-indigo-700">
                      ${financialData.revenue.reduce((sum, month) => sum + month.sales, 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-teal-100 p-4 rounded">
                    <h4 className="text-sm font-medium text-teal-800">Total Transactions</h4>
                    <p className="text-2xl font-bold text-teal-700">
                      {financialData.revenue.reduce((sum, month) => sum + month.transactions, 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-4 rounded">
                    <h4 className="text-sm font-medium text-blue-800">Average Transaction</h4>
                    <p className="text-2xl font-bold text-blue-700">
                      ${(financialData.revenue.reduce((sum, month) => sum + month.sales, 0) / 
                         financialData.revenue.reduce((sum, month) => sum + month.transactions, 0)).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Transaction Fee Calculation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-medium mb-4">Transaction Fee Calculation</h3>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Fee Rates by Plan</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="border rounded p-3 text-center">
                        <p className="text-xs text-gray-500">Standard</p>
                        <p className="text-lg font-bold">{(financialData.transactionFees.standard * 100).toFixed(1)}%</p>
                      </div>
                      <div className="border rounded p-3 text-center">
                        <p className="text-xs text-gray-500">Premium</p>
                        <p className="text-lg font-bold">{(financialData.transactionFees.premium * 100).toFixed(1)}%</p>
                      </div>
                      <div className="border rounded p-3 text-center">
                        <p className="text-xs text-gray-500">Enterprise</p>
                        <p className="text-lg font-bold">{(financialData.transactionFees.enterprise * 100).toFixed(1)}%</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={financialData.transactionFees.monthly}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => [`${value}`, 'Transaction Fees']} />
                        <Bar dataKey="fees" name="Transaction Fees" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* Placement & Additional Fees Overview */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-medium mb-4">Placement & Additional Fees</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Placement Fees</h4>
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={financialData.placementFees}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={60}
                              fill="#8884d8"
                              dataKey="fee"
                              nameKey="location"
                              label={({ location, percent }: { location: string; percent: number }) => `${location}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {financialData.placementFees.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={['#8884d8', '#82ca9d', '#ffc658', '#ff8042'][financialData.placementFees.indexOf(entry) % 4]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => [`${value}`, 'Fee']} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Additional Fees</h4>
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr>
                            <th className="text-left pb-2">Type</th>
                            <th className="text-right pb-2">Amount</th>
                            <th className="text-right pb-2">Frequency</th>
                          </tr>
                        </thead>
                        <tbody>
                          {financialData.additionalFees.map((fee, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                              <td className="py-2">{fee.type}</td>
                              <td className="text-right py-2">${fee.fee}</td>
                              <td className="text-right py-2">{fee.isMonthly ? 'Monthly' : 'One-time'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Profit & Loss Analytics */}
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h3 className="text-lg font-medium mb-4">Profit & Loss Analytics</h3>
                
                <div className="h-64 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={financialData.profitLoss}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value: number) => [`${value.toLocaleString()}`, '']} />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="expenses" name="Expenses" stroke="#ff8042" />
                      <Line type="monotone" dataKey="profit" name="Profit" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-100 p-4 rounded">
                    <h4 className="text-sm font-medium text-green-800">Total Revenue</h4>
                    <p className="text-2xl font-bold text-green-700">
                      ${financialData.yearlyTotals.revenue.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-red-100 p-4 rounded">
                    <h4 className="text-sm font-medium text-red-800">Total Expenses</h4>
                    <p className="text-2xl font-bold text-red-700">
                      ${financialData.yearlyTotals.expenses.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-4 rounded">
                    <h4 className="text-sm font-medium text-blue-800">Net Profit</h4>
                    <p className="text-2xl font-bold text-blue-700">
                      ${financialData.yearlyTotals.profit.toLocaleString()}
                    </p>
                    <p className="text-sm text-blue-600">
                      {((financialData.yearlyTotals.profit / financialData.yearlyTotals.revenue) * 100).toFixed(1)}% Profit Margin
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RetailSpaceManagement;