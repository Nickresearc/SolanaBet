import React from 'react';
import { ArrowRight, TrendingUp, Users } from 'lucide-react';
import { PoolData } from '../../types';
import { formatAmount } from '../../utils/formatters';

interface PoolCardProps {
  pool: PoolData;
  onClick?: () => void;
}

const PoolCard: React.FC<PoolCardProps> = ({ pool, onClick }) => {
  return (
    <div 
      className="glass-card p-5 hover:border-primary-500/50 transition-all duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-white">{pool.name}</h3>
          <div className="flex items-center">
            <Users size={14} className="mr-1.5 text-gray-400" />
            <span className="text-sm text-gray-400">{pool.participants} participants</span>
          </div>
        </div>
        <div className="flex items-center bg-success-500/10 px-2.5 py-1 rounded-full">
          <TrendingUp size={14} className="mr-1 text-success-400" />
          <span className="text-sm font-medium text-success-400">{pool.apr}% APR</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <p className="text-sm text-gray-400">Total Liquidity</p>
          <p className="font-medium text-white">{formatAmount(pool.totalLiquidity)} SOL</p>
        </div>
        
        {pool.userLiquidity !== undefined && (
          <div>
            <p className="text-sm text-gray-400">Your Liquidity</p>
            <p className="font-medium text-white">{formatAmount(pool.userLiquidity)} SOL</p>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between pt-3 border-t border-dark-100">
        <div className="flex gap-2">
          <button className="btn-primary py-1.5 px-3 text-sm">
            <span>Add Liquidity</span>
          </button>
          
          {pool.userLiquidity !== undefined && pool.userLiquidity > 0 && (
            <button className="btn-outline py-1.5 px-3 text-sm">
              <span>Remove</span>
            </button>
          )}
        </div>
        
        <button className="btn-ghost py-1.5 px-3 text-sm" onClick={onClick}>
          <span className="mr-1">Details</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default PoolCard;