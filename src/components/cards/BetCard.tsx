import React from 'react';
import { ArrowRight, Clock, Users } from 'lucide-react';
import { Bet, BetStatus, BetType } from '../../types';
import { formatDate, formatAmount, shortenAddress } from '../../utils/formatters';

interface BetCardProps {
  bet: Bet;
  onClick?: () => void;
}

const BetCard: React.FC<BetCardProps> = ({ bet, onClick }) => {
  const getStatusBadge = (status: BetStatus) => {
    switch (status) {
      case BetStatus.OPEN:
        return <span className="badge-primary">Open</span>;
      case BetStatus.MATCHED:
        return <span className="badge-warning">Matched</span>;
      case BetStatus.ACTIVE:
        return <span className="badge-success">Active</span>;
      case BetStatus.SETTLED:
        return <span className="badge-secondary">Settled</span>;
      case BetStatus.CANCELLED:
        return <span className="badge-error">Cancelled</span>;
    }
  };

  const getTypeBadge = (type: BetType) => {
    switch (type) {
      case BetType.P2P:
        return <span className="badge bg-blue-500/20 text-blue-300">P2P</span>;
      case BetType.POOL:
        return <span className="badge bg-purple-500/20 text-purple-300">Pool</span>;
      case BetType.OPTION:
        return <span className="badge bg-yellow-500/20 text-yellow-300">Option</span>;
    }
  };

  return (
    <div 
      className="glass-card p-5 hover:border-primary-500/50 transition-all duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-white">{bet.title}</h3>
          <p className="text-sm text-gray-400 line-clamp-2">{bet.description}</p>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge(bet.status)}
          {getTypeBadge(bet.type)}
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center text-sm text-gray-400">
          <span>Created by: </span>
          <span className="ml-1 text-primary-400">{shortenAddress(bet.creator.walletAddress)}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center text-sm">
            <Clock size={14} className="mr-1 text-gray-500" />
            <span className="text-gray-400">{formatDate(bet.resolveDate)}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Users size={14} className="mr-1 text-gray-500" />
            <span className="text-gray-400">{bet.participants}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-3 border-t border-dark-100">
        <div>
          <p className="text-sm text-gray-400">Stake</p>
          <p className="font-medium text-white">{formatAmount(bet.amount)} SOL</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-400">Total Pool</p>
          <p className="font-medium text-white">{formatAmount(bet.totalStaked)} SOL</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-400">Odds</p>
          <p className="font-medium text-success-400">x{bet.odds.toFixed(2)}</p>
        </div>
        
        <button className="btn-primary py-1.5 px-3 text-sm">
          <span className="mr-1">View</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default BetCard;