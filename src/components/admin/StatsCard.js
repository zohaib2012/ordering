import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color = 'blue',
  trend = 0,
  description = '',
  loading = false 
}) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    purple: 'bg-purple-500',
    red: 'bg-red-500',
    indigo: 'bg-indigo-500'
  };

  const textColorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    orange: 'text-orange-600',
    purple: 'text-purple-600',
    red: 'text-red-600',
    indigo: 'text-indigo-600'
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="flex items-center">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}

          {typeof trend === 'number' && (
            <div className="flex items-center mt-3">
              {trend >= 0 ? (
                <>
                  <TrendingUp className={`h-4 w-4 ${textColorClasses[color]} mr-1`} />
                  <span className={`text-sm font-medium ${textColorClasses[color]}`}>
                    {Math.abs(trend)}%
                  </span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-sm font-medium text-red-500">
                    {Math.abs(trend)}%
                  </span>
                </>
              )}
              <span className="text-sm text-gray-500 ml-2">from last period</span>
            </div>
          )}
        </div>
        
        <div className={`${colorClasses[color]} p-3 rounded-xl`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;