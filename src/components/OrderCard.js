// import React from 'react';
// import { Clock, CheckCircle, XCircle, Truck, Package } from 'lucide-react';

// const OrderCard = ({ order }) => {
//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'pending':
//         return <Clock className="h-5 w-5 text-yellow-500" />;
//       case 'confirmed':
//       case 'preparing':
//         return <Package className="h-5 w-5 text-blue-500" />;
//       case 'ready':
//         return <CheckCircle className="h-5 w-5 text-green-500" />;
//       case 'delivered':
//         return <Truck className="h-5 w-5 text-green-500" />;
//       case 'cancelled':
//         return <XCircle className="h-5 w-5 text-red-500" />;
//       default:
//         return <Clock className="h-5 w-5 text-gray-500" />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'confirmed':
//         return 'bg-blue-100 text-blue-800';
//       case 'preparing':
//         return 'bg-purple-100 text-purple-800';
//       case 'ready':
//         return 'bg-green-100 text-green-800';
//       case 'delivered':
//         return 'bg-green-100 text-green-800';
//       case 'cancelled':
//         return 'bg-red-100 text-red-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 mb-4">
//       <div className="flex justify-between items-start mb-4">
//         <div>
//           <h3 className="font-semibold text-lg">Order #{order._id.slice(-6)}</h3>
//           <p className="text-gray-600 text-sm">
//             {formatDate(order.createdAt)}
//           </p>
//         </div>
//         <div className="flex items-center space-x-2">
//           <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
//             {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//           </span>
//           {getStatusIcon(order.status)}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//         <div>
//           <h4 className="font-medium text-gray-700 mb-2">Order Type</h4>
//           <div className="flex items-center space-x-2">
//             <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//               order.orderType === 'delivery' 
//                 ? 'bg-blue-100 text-blue-800'
//                 : 'bg-green-100 text-green-800'
//             }`}>
//               {order.orderType.charAt(0).toUpperCase() + order.orderType.slice(1)}
//             </span>
//             <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//               order.paymentMethod === 'cod'
//                 ? 'bg-red-100 text-red-800'
//                 : 'bg-green-100 text-green-800'
//             }`}>
//               {order.paymentMethod.toUpperCase()}
//             </span>
//           </div>
//         </div>

//         <div>
//           <h4 className="font-medium text-gray-700 mb-2">Items</h4>
//           <p className="text-sm text-gray-600">
//             {order.items.reduce((total, item) => total + item.quantity, 0)} items
//           </p>
//         </div>
//       </div>

//       <div className="border-t pt-4">
//         <div className="flex justify-between items-center">
//           <div>
//             <p className="text-sm text-gray-600">Total Amount</p>
//             <p className="text-xl font-bold">${order.totalAmount.toFixed(2)}</p>
//           </div>
          
//           {order.orderType === 'delivery' && order.deliveryAddress && (
//             <div className="text-right">
//               <p className="text-sm text-gray-600">Delivery Address</p>
//               <p className="text-sm font-medium">
//                 {order.deliveryAddress.city}, {order.deliveryAddress.state}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderCard;

// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import { Clock, CheckCircle, XCircle, Truck, Package, ExternalLink } from 'lucide-react';

// // const OrderCard = ({ order }) => {


// //   return (
// //     <Link to={`/orders/${order._id}`}>
// //       <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow cursor-pointer">
// //         {/* ... existing order card content ... */}
        
// //         <div className="flex justify-between items-center mt-4 pt-4 border-t">
// //           <span className="text-sm text-gray-600">
// //             Click to view details
// //           </span>
// //           <ExternalLink className="h-4 w-4 text-gray-400" />
// //         </div>
// //       </div>
// //     </Link>
// //   );
// // };

// // export default OrderCard;


import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle, XCircle, Truck, Package, ExternalLink } from 'lucide-react';

const OrderCard = ({ order }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'confirmed':
      case 'preparing':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'ready':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'delivered':
        return <Truck className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'preparing':
        return 'bg-purple-100 text-purple-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Link to={`/orders/${order._id}`} className="block">
      <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg">Order #{order._id.slice(-6)}</h3>
            <p className="text-gray-600 text-sm">
              {formatDate(order.createdAt)}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
            {getStatusIcon(order.status)}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Order Type</h4>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                order.orderType === 'delivery' 
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {order.orderType.charAt(0).toUpperCase() + order.orderType.slice(1)}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                order.paymentMethod === 'cod'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {order.paymentMethod.toUpperCase()}
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-2">Items</h4>
            <p className="text-sm text-gray-600">
              {order.items.reduce((total, item) => total + item.quantity, 0)} items
            </p>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-xl font-bold">${order.totalAmount.toFixed(2)}</p>
            </div>
            
            {order.orderType === 'delivery' && order.deliveryAddress && (
              <div className="text-right">
                <p className="text-sm text-gray-600">Delivery Address</p>
                <p className="text-sm font-medium">
                  {order.deliveryAddress.city}, {order.deliveryAddress.state}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 pt-4 border-t">
          <span className="text-sm text-gray-600">
            Click to view details
          </span>
          <ExternalLink className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;