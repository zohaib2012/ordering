// import React, { useState, useEffect } from 'react';
// import { 
//   BarChart3, 
//   TrendingUp, 
//   TrendingDown, 
//   Download, 
//   Calendar,
//   Filter,
//   DollarSign,
//   ShoppingBag,
//   Users,
//   Package,
//   RefreshCw
// } from 'lucide-react';
// import { adminAPI } from '../../utils/api';
// import toast from 'react-hot-toast';
// import LoadingSpinner from '../../components/LoadingSpinner';

// const AdminReports = () => {
//   const [reportData, setReportData] = useState({
//     salesReport: [],
//     summary: {
//       totalOrders: 0,
//       totalRevenue: 0,
//       avgOrderValue: 0
//     }
//   });
//   const [loading, setLoading] = useState(true);
//   const [dateRange, setDateRange] = useState({
//     period: 'weekly',
//     startDate: '',
//     endDate: ''
//   });
//   const [chartType, setChartType] = useState('bar');

//   useEffect(() => {
//     fetchReportData();
//   }, [dateRange.period]);

//   const fetchReportData = async () => {
//     try {
//       setLoading(true);
//       const params = {};
      
//       if (dateRange.period === 'custom' && dateRange.startDate && dateRange.endDate) {
//         params.startDate = dateRange.startDate;
//         params.endDate = dateRange.endDate;
//       } else {
//         params.period = dateRange.period;
//       }

//       const response = await adminAPI.getSalesReport(params);
//       setReportData(response.data || { salesReport: [], summary: {} });
//     } catch (error) {
//       console.error('Error fetching report data:', error);
//       toast.error('Failed to load reports');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleExportReport = (format) => {
//     toast.success(`${format.toUpperCase()} report exported successfully`);
//   };

//   const calculateGrowth = () => {
//     const report = reportData.salesReport;
//     if (report.length < 2) return { revenue: 0, orders: 0 };

//     const latest = report[report.length - 1];
//     const previous = report[report.length - 2] || { totalRevenue: 0, totalOrders: 0 };

//     const revenueGrowth = previous.totalRevenue 
//       ? ((latest.totalRevenue - previous.totalRevenue) / previous.totalRevenue * 100).toFixed(1)
//       : 0;
    
//     const orderGrowth = previous.totalOrders
//       ? ((latest.totalOrders - previous.totalOrders) / previous.totalOrders * 100).toFixed(1)
//       : 0;

//     return { revenue: parseFloat(revenueGrowth), orders: parseFloat(orderGrowth) };
//   };


//   const growth = calculateGrowth();

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0
//     }).format(amount);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Sales Reports</h1>
//           <p className="text-gray-600">Analytics and performance insights</p>
//         </div>
        
//         <div className="flex items-center space-x-3">
//           <button
//             onClick={() => handleExportReport('pdf')}
//             className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             <Download className="h-4 w-4 mr-2" />
//             Export PDF
//           </button>
//           <button
//             onClick={() => handleExportReport('excel')}
//             className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//           >
//             <Download className="h-4 w-4 mr-2" />
//             Export Excel
//           </button>
//         </div>
//       </div>

//       {/* Date Range Selector */}
//       <div className="bg-white rounded-lg shadow p-6">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <div className="flex items-center space-x-4">
//             <Calendar className="h-5 w-5 text-gray-500" />
//             <h3 className="font-medium">Select Date Range</h3>
//           </div>
          
//           <div className="flex flex-col sm:flex-row gap-3">
//             <select
//               value={dateRange.period}
//               onChange={(e) => setDateRange({...dateRange, period: e.target.value})}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//             >
//               <option value="daily">Last 7 Days</option>
//               <option value="weekly">Last 4 Weeks</option>
//               <option value="monthly">Last 6 Months</option>
//               <option value="yearly">Last Year</option>
//               <option value="custom">Custom Range</option>
//             </select>
            
//             {dateRange.period === 'custom' && (
//               <div className="flex gap-2">
//                 <input
//                   type="date"
//                   value={dateRange.startDate}
//                   onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
//                   className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 <span className="self-center">to</span>
//                 <input
//                   type="date"
//                   value={dateRange.endDate}
//                   onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
//                   className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>
//             )}
            
//             <button
//               onClick={fetchReportData}
//               className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
//             >
//               <RefreshCw className="h-4 w-4 mr-2" />
//               Apply
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Summary Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white rounded-xl shadow p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">Total Revenue</p>
//               <p className="text-3xl font-bold mt-2">
//                 {formatCurrency(reportData.summary.totalRevenue || 0)}
//               </p>
//               <div className="flex items-center mt-2">
//                 {growth.revenue >= 0 ? (
//                   <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
//                 ) : (
//                   <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
//                 )}
//                 <span className={`text-sm font-medium ${
//                   growth.revenue >= 0 ? 'text-green-600' : 'text-red-600'
//                 }`}>
//                   {Math.abs(growth.revenue)}%
//                 </span>
//                 <span className="text-sm text-gray-500 ml-2">from previous period</span>
//               </div>
//             </div>
//             <div className="p-3 bg-green-100 text-green-600 rounded-lg">
//               <DollarSign className="h-6 w-6" />
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-xl shadow p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">Total Orders</p>
//               <p className="text-3xl font-bold mt-2">{reportData.summary.totalOrders || 0}</p>
//               <div className="flex items-center mt-2">
//                 {growth.orders >= 0 ? (
//                   <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
//                 ) : (
//                   <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
//                 )}
//                 <span className={`text-sm font-medium ${
//                   growth.orders >= 0 ? 'text-green-600' : 'text-red-600'
//                 }`}>
//                   {Math.abs(growth.orders)}%
//                 </span>
//                 <span className="text-sm text-gray-500 ml-2">from previous period</span>
//               </div>
//             </div>
//             <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
//               <ShoppingBag className="h-6 w-6" />
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-xl shadow p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500">Avg Order Value</p>
//               <p className="text-3xl font-bold mt-2">
//                 {formatCurrency(reportData.summary.avgOrderValue || 0)}
//               </p>
//               <p className="text-sm text-gray-500 mt-2">Per order average</p>
//             </div>
//             <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
//               <Package className="h-6 w-6" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Revenue Chart */}
//         <div className="bg-white rounded-xl shadow p-6">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h3 className="text-lg font-semibold">Revenue Trend</h3>
//               <p className="text-sm text-gray-600">Daily revenue performance</p>
//             </div>
//             <BarChart3 className="h-5 w-5 text-gray-500" />
//           </div>
          
//           {loading ? (
//             <div className="flex justify-center py-12">
//               <LoadingSpinner />
//             </div>
//           ) : reportData.salesReport.length === 0 ? (
//             <div className="text-center py-12 text-gray-500">
//               <BarChart3 className="h-12 w-12 mx-auto mb-3 text-gray-300" />
//               <p>No revenue data available for selected period</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {reportData.salesReport.slice(-7).map((day, index) => {
//                 const maxRevenue = Math.max(...reportData.salesReport.map(d => d.totalRevenue));
//                 const percentage = (day.totalRevenue / maxRevenue) * 100;
                
//                 return (
//                   <div key={index} className="space-y-2">
//                     <div className="flex justify-between text-sm">
//                       <span className="font-medium">{day._id?.date || 'Date'}</span>
//                       <span className="font-bold">{formatCurrency(day.totalRevenue)}</span>
//                     </div>
//                     <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                       <div 
//                         className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500"
//                         style={{ width: `${percentage}%` }}
//                       ></div>
//                     </div>
//                     <div className="flex justify-between text-xs text-gray-500">
//                       <span>{day.totalOrders} orders</span>
//                       <span>Avg: {formatCurrency(day.averageOrderValue)}</span>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>

//         {/* Orders Chart */}
//         <div className="bg-white rounded-xl shadow p-6">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h3 className="text-lg font-semibold">Order Volume</h3>
//               <p className="text-sm text-gray-600">Daily order count</p>
//             </div>
//             <ShoppingBag className="h-5 w-5 text-gray-500" />
//           </div>
          
//           {loading ? (
//             <div className="flex justify-center py-12">
//               <LoadingSpinner />
//             </div>
//           ) : reportData.salesReport.length === 0 ? (
//             <div className="text-center py-12 text-gray-500">
//               <ShoppingBag className="h-12 w-12 mx-auto mb-3 text-gray-300" />
//               <p>No order data available for selected period</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {reportData.salesReport.slice(-7).map((day, index) => {
//                 const maxOrders = Math.max(...reportData.salesReport.map(d => d.totalOrders));
//                 const percentage = (day.totalOrders / maxOrders) * 100;
                
//                 return (
//                   <div key={index} className="space-y-2">
//                     <div className="flex justify-between text-sm">
//                       <span className="font-medium">{day._id?.date || 'Date'}</span>
//                       <span className="font-bold">{day.totalOrders} orders</span>
//                     </div>
//                     <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                       <div 
//                         className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
//                         style={{ width: `${percentage}%` }}
//                       ></div>
//                     </div>
//                     <div className="flex justify-between text-xs text-gray-500">
//                       <span>Revenue: {formatCurrency(day.totalRevenue)}</span>
//                       <span>Avg: {formatCurrency(day.averageOrderValue)}</span>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Detailed Table */}
//       <div className="bg-white rounded-xl shadow overflow-hidden">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-lg font-semibold">Detailed Report</h3>
//               <p className="text-sm text-gray-600">Day-wise breakdown</p>
//             </div>
//             <div className="flex items-center space-x-2">
//               <select
//                 value={chartType}
//                 onChange={(e) => setChartType(e.target.value)}
//                 className="px-3 py-1 border border-gray-300 rounded text-sm"
//               >
//                 <option value="bar">Bar Chart</option>
//                 <option value="line">Line Chart</option>
//                 <option value="table">Table View</option>
//               </select>
//             </div>
//           </div>
//         </div>
        
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Orders
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Revenue
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Avg Order Value
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Growth
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {loading ? (
//                 <tr>
//                   <td colSpan="5" className="px-6 py-8 text-center">
//                     <LoadingSpinner />
//                   </td>
//                 </tr>
//               ) : reportData.salesReport.length === 0 ? (
//                 <tr>
//                   <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
//                     No data available
//                   </td>
//                 </tr>
//               ) : (
//                 [...reportData.salesReport].reverse().map((day, index) => {
//                   const prevDay = reportData.salesReport[reportData.salesReport.length - index - 2];
//                   const revenueGrowth = prevDay 
//                     ? ((day.totalRevenue - prevDay.totalRevenue) / prevDay.totalRevenue * 100).toFixed(1)
//                     : 0;
                  
//                   const orderGrowth = prevDay
//                     ? ((day.totalOrders - prevDay.totalOrders) / prevDay.totalOrders * 100).toFixed(1)
//                     : 0;

//                   return (
//                     <tr key={index} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="font-medium">{day._id?.date || 'N/A'}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="font-bold">{day.totalOrders}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="font-bold">{formatCurrency(day.totalRevenue)}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="font-medium">{formatCurrency(day.averageOrderValue)}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           {parseFloat(revenueGrowth) >= 0 ? (
//                             <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
//                           ) : (
//                             <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
//                           )}
//                           <span className={`text-sm font-medium ${
//                             parseFloat(revenueGrowth) >= 0 ? 'text-green-600' : 'text-red-600'
//                           }`}>
//                             {Math.abs(parseFloat(revenueGrowth))}%
//                           </span>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>
        
//         {/* Pagination */}
//         <div className="px-6 py-4 border-t border-gray-200">
//           <div className="flex items-center justify-between">
//             <div className="text-sm text-gray-700">
//               Showing {Math.min(10, reportData.salesReport.length)} of {reportData.salesReport.length} days
//             </div>
//             <div className="flex items-center space-x-2">
//               <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
//                 Previous
//               </button>
//               <span className="text-sm text-gray-700">Page 1 of 1</span>
//               <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminReports;
import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Calendar,
  Filter,
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  RefreshCw
} from 'lucide-react';
import { adminAPI } from '../../utils/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/LoadingSpinner';

const AdminReports = () => {
  const [reportData, setReportData] = useState({
    salesReport: [],
    summary: {
      totalOrders: 0,
      totalRevenue: 0,
      avgOrderValue: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    period: 'weekly',
    startDate: '',
    endDate: ''
  });
  const [chartType, setChartType] = useState('bar');

  useEffect(() => {
    fetchReportData();
  }, [dateRange.period]);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      const params = {};
      
      if (dateRange.period === 'custom' && dateRange.startDate && dateRange.endDate) {
        params.startDate = dateRange.startDate;
        params.endDate = dateRange.endDate;
      } else {
        params.period = dateRange.period;
      }

      const response = await adminAPI.getSalesReport(params);
      // Ensure salesReport is always an array
      const data = response.data || {};
      setReportData({
        salesReport: data.salesReport || [],
        summary: data.summary || {
          totalOrders: 0,
          totalRevenue: 0,
          avgOrderValue: 0
        }
      });
    } catch (error) {
      console.error('Error fetching report data:', error);
      toast.error('Failed to load reports');
      // Set empty data on error
      setReportData({
        salesReport: [],
        summary: {
          totalOrders: 0,
          totalRevenue: 0,
          avgOrderValue: 0
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExportReport = (format) => {
    toast.success(`${format.toUpperCase()} report exported successfully`);
  };

  const calculateGrowth = () => {
    const report = reportData.salesReport || [];
    if (report.length < 2) return { revenue: 0, orders: 0 };

    const latest = report[report.length - 1];
    const previous = report[report.length - 2] || { 
      totalRevenue: 0, 
      totalOrders: 0,
      averageOrderValue: 0
    };

    const latestRevenue = latest.totalRevenue || 0;
    const previousRevenue = previous.totalRevenue || 0;
    const latestOrders = latest.totalOrders || 0;
    const previousOrders = previous.totalOrders || 0;

    const revenueGrowth = previousRevenue > 0 
      ? ((latestRevenue - previousRevenue) / previousRevenue * 100)
      : 0;
    
    const orderGrowth = previousOrders > 0
      ? ((latestOrders - previousOrders) / previousOrders * 100)
      : 0;

    return { 
      revenue: parseFloat(revenueGrowth.toFixed(1)), 
      orders: parseFloat(orderGrowth.toFixed(1)) 
    };
  };

  const growth = calculateGrowth();

  const formatCurrency = (amount) => {
    const numAmount = amount || 0;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numAmount);
  };

  const formatShortCurrency = (amount) => {
    const numAmount = amount || 0;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numAmount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Reports</h1>
          <p className="text-gray-600">Analytics and performance insights</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleExportReport('pdf')}
            className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </button>
          <button
            onClick={() => handleExportReport('excel')}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Excel
          </button>
        </div>
      </div>

      {/* Date Range Selector */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Calendar className="h-5 w-5 text-gray-500" />
            <h3 className="font-medium">Select Date Range</h3>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={dateRange.period}
              onChange={(e) => setDateRange({...dateRange, period: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="daily">Last 7 Days</option>
              <option value="weekly">Last 4 Weeks</option>
              <option value="monthly">Last 6 Months</option>
              <option value="yearly">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
            
            {dateRange.period === 'custom' && (
              <div className="flex gap-2">
                <input
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <span className="self-center">to</span>
                <input
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            )}
            
            <button
              onClick={fetchReportData}
              className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-3xl font-bold mt-2">
                {formatCurrency(reportData.summary.totalRevenue)}
              </p>
              <div className="flex items-center mt-2">
                {growth.revenue >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${
                  growth.revenue >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {Math.abs(growth.revenue)}%
                </span>
                <span className="text-sm text-gray-500 ml-2">from previous period</span>
              </div>
            </div>
            <div className="p-3 bg-green-100 text-green-600 rounded-lg">
              <DollarSign className="h-6 w-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-3xl font-bold mt-2">{reportData.summary.totalOrders}</p>
              <div className="flex items-center mt-2">
                {growth.orders >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${
                  growth.orders >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {Math.abs(growth.orders)}%
                </span>
                <span className="text-sm text-gray-500 ml-2">from previous period</span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <ShoppingBag className="h-6 w-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Order Value</p>
              <p className="text-3xl font-bold mt-2">
                {formatShortCurrency(reportData.summary.avgOrderValue)}
              </p>
              <p className="text-sm text-gray-500 mt-2">Per order average</p>
            </div>
            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
              <Package className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Revenue Trend</h3>
              <p className="text-sm text-gray-600">Daily revenue performance</p>
            </div>
            <BarChart3 className="h-5 w-5 text-gray-500" />
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : reportData.salesReport.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <BarChart3 className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No revenue data available for selected period</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reportData.salesReport.slice(-7).map((day, index) => {
                const dayRevenue = day.totalRevenue || 0;
                const dayOrders = day.totalOrders || 0;
                const avgValue = day.averageOrderValue || 0;
                
                const maxRevenue = Math.max(...reportData.salesReport.map(d => d.totalRevenue || 0));
                const percentage = maxRevenue > 0 ? (dayRevenue / maxRevenue) * 100 : 0;
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{day._id?.date || 'Date'}</span>
                      <span className="font-bold">{formatShortCurrency(dayRevenue)}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{dayOrders} orders</span>
                      <span>Avg: {formatShortCurrency(avgValue)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Orders Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Order Volume</h3>
              <p className="text-sm text-gray-600">Daily order count</p>
            </div>
            <ShoppingBag className="h-5 w-5 text-gray-500" />
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : reportData.salesReport.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <ShoppingBag className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No order data available for selected period</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reportData.salesReport.slice(-7).map((day, index) => {
                const dayRevenue = day.totalRevenue || 0;
                const dayOrders = day.totalOrders || 0;
                const avgValue = day.averageOrderValue || 0;
                
                const maxOrders = Math.max(...reportData.salesReport.map(d => d.totalOrders || 0));
                const percentage = maxOrders > 0 ? (dayOrders / maxOrders) * 100 : 0;
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{day._id?.date || 'Date'}</span>
                      <span className="font-bold">{dayOrders} orders</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Revenue: {formatShortCurrency(dayRevenue)}</span>
                      <span>Avg: {formatShortCurrency(avgValue)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Detailed Report</h3>
              <p className="text-sm text-gray-600">Day-wise breakdown</p>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded text-sm"
              >
                <option value="bar">Bar Chart</option>
                <option value="line">Line Chart</option>
                <option value="table">Table View</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Order Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Growth
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center">
                    <LoadingSpinner />
                  </td>
                </tr>
              ) : reportData.salesReport.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No data available
                  </td>
                </tr>
              ) : (
                [...reportData.salesReport].reverse().map((day, index) => {
                  const dayRevenue = day.totalRevenue || 0;
                  const dayOrders = day.totalOrders || 0;
                  const avgValue = day.averageOrderValue || 0;
                  
                  const prevDay = reportData.salesReport[reportData.salesReport.length - index - 2];
                  const prevRevenue = prevDay?.totalRevenue || 0;
                  const prevOrders = prevDay?.totalOrders || 0;
                  
                  const revenueGrowth = prevRevenue > 0 
                    ? ((dayRevenue - prevRevenue) / prevRevenue * 100).toFixed(1)
                    : 0;
                  
                  const orderGrowth = prevOrders > 0
                    ? ((dayOrders - prevOrders) / prevOrders * 100).toFixed(1)
                    : 0;

                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium">{day._id?.date || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-bold">{dayOrders}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-bold">{formatShortCurrency(dayRevenue)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium">{formatShortCurrency(avgValue)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {parseFloat(revenueGrowth) >= 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                          )}
                          <span className={`text-sm font-medium ${
                            parseFloat(revenueGrowth) >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {Math.abs(parseFloat(revenueGrowth))}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {Math.min(10, reportData.salesReport.length)} of {reportData.salesReport.length} days
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                Previous
              </button>
              <span className="text-sm text-gray-700">Page 1 of 1</span>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;