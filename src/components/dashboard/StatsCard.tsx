import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change?: number;
  icon: React.ElementType;
  iconBg?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  change, 
  icon: Icon,
  iconBg = 'bg-primary-500/20'
}) => {
  return (
    <div className="glass-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
          
          {change !== undefined && (
            <div className="mt-1 flex items-center">
              {change >= 0 ? (
                <div className="flex items-center text-success-400">
                  <ArrowUp size={14} className="mr-1" />
                  <span className="text-xs font-medium">{change}%</span>
                </div>
              ) : (
                <div className="flex items-center text-error-400">
                  <ArrowDown size={14} className="mr-1" />
                  <span className="text-xs font-medium">{Math.abs(change)}%</span>
                </div>
              )}
              <span className="ml-1 text-xs text-gray-400">vs. last week</span>
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-lg ${iconBg}`}>
          <Icon size={20} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;