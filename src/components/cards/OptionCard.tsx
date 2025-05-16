import React from 'react';
import { Clock, TrendingDown, TrendingUp } from 'lucide-react';
import { OptionsContract } from '../../types';
import { formatAmount, formatDate } from '../../utils/formatters';

interface OptionCardProps {
  option: OptionsContract;
  onClick?: () => void;
}

const OptionCard: React.FC<OptionCardProps> = ({ option, onClick }) => {
  const isProfitable = option.type === 'call' 
    ? option.currentPrice > option.strikePrice
    : option.currentPrice < option.strikePrice;
  
  const priceDifference = option.currentPrice - option.strikePrice;
  const percentageDiff = (Math.abs(priceDifference) / option.strikePrice) * 100;

  return (
    <div 
      className="glass-card p-5 hover:border-primary-500/50 transition-all duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-white">{option.asset} Option</h3>
          <div className="flex items-center">
            <Clock size={14} className="mr-1.5 text-gray-400" />
            <span className="text-sm text-gray-400">Expires: {formatDate(option.expiry)}</span>
          </div>
        </div>
        <div className="flex items-center">
          <span className={`badge ${option.type === 'call' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
            {option.type === 'call' ? 'CALL' : 'PUT'}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-400">Strike Price</p>
          <p className="font-medium text-white">${option.strikePrice.toFixed(2)}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-400">Current Price</p>
          <div className="flex items-center">
            <p className="font-medium text-white">${option.currentPrice.toFixed(2)}</p>
            {priceDifference !== 0 && (
              <div className={`flex items-center ml-2 ${isProfitable ? 'text-success-400' : 'text-error-400'}`}>
                {isProfitable ? <TrendingUp size={14} className="mr-0.5" /> : <TrendingDown size={14} className="mr-0.5" />}
                <span className="text-xs font-medium">{percentageDiff.toFixed(2)}%</span>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <p className="text-sm text-gray-400">Premium</p>
          <p className="font-medium text-white">{formatAmount(option.premium)} SOL</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-400">Open Interest</p>
          <p className="font-medium text-white">{formatAmount(option.openInterest)} SOL</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-3 border-t border-dark-100">
        <div className={`py-1 px-2 rounded text-sm font-medium ${isProfitable ? 'bg-success-500/10 text-success-400' : 'bg-error-500/10 text-error-400'}`}>
          {isProfitable ? 'In profit' : 'Out of profit'}
        </div>
        
        <div className="flex gap-2">
          <button className="btn-primary py-1.5 px-3 text-sm">
            <span>Buy</span>
          </button>
          <button className="btn-outline py-1.5 px-3 text-sm">
            <span>Sell</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptionCard;