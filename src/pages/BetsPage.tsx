import React, { useState } from 'react';
import { Filter, Search, Plus } from 'lucide-react';
import BetCard from '../components/cards/BetCard';
import CreateBetModal from '../components/CreateBetModal';
import { bets } from '../utils/mockData';
import { BetCategory, BetStatus, BetType } from '../types';

const BetsPage: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: 'all' as 'all' | BetType,
    status: 'all' as 'all' | BetStatus,
    category: 'all' as 'all' | BetCategory,
  });
  
  // Filter bets based on search and filters
  const filteredBets = bets.filter(bet => {
    // Search filter
    if (searchQuery && !bet.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Type filter
    if (filters.type !== 'all' && bet.type !== filters.type) {
      return false;
    }
    
    // Status filter
    if (filters.status !== 'all' && bet.status !== filters.status) {
      return false;
    }
    
    // Category filter
    if (filters.category !== 'all' && bet.category !== filters.category) {
      return false;
    }
    
    return true;
  });
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">P2P Bets</h1>
          <p className="text-gray-400 mt-1">Browse and join bets from the community</p>
        </div>
        
        <button 
          className="btn-primary mt-4 md:mt-0"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus size={18} className="mr-2" />
          Create New Bet
        </button>
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search bets..."
            className="input pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        
        <div className="flex gap-4">
          <div className="relative">
            <select
              className="input appearance-none pr-10 pl-9"
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value as any})}
            >
              <option value="all">All Types</option>
              <option value={BetType.P2P}>P2P</option>
              <option value={BetType.POOL}>Pool</option>
              <option value={BetType.OPTION}>Option</option>
            </select>
            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          
          <div className="relative">
            <select
              className="input appearance-none pr-10 pl-9"
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value as any})}
            >
              <option value="all">All Statuses</option>
              <option value={BetStatus.OPEN}>Open</option>
              <option value={BetStatus.MATCHED}>Matched</option>
              <option value={BetStatus.ACTIVE}>Active</option>
              <option value={BetStatus.SETTLED}>Settled</option>
            </select>
            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          
          <div className="relative">
            <select
              className="input appearance-none pr-10 pl-9"
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value as any})}
            >
              <option value="all">All Categories</option>
              <option value={BetCategory.CRYPTO}>Crypto</option>
              <option value={BetCategory.SPORTS}>Sports</option>
              <option value={BetCategory.POLITICS}>Politics</option>
              <option value={BetCategory.ESPORTS}>Esports</option>
              <option value={BetCategory.CUSTOM}>Custom</option>
            </select>
            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>
      
      {/* Bets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBets.length > 0 ? (
          filteredBets.map((bet) => (
            <BetCard key={bet.id} bet={bet} />
          ))
        ) : (
          <div className="col-span-2 flex flex-col items-center justify-center py-16 text-center">
            <p className="text-gray-400 mb-2">No bets found matching your criteria</p>
            <button 
              className="btn-primary mt-2"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus size={18} className="mr-2" />
              Create New Bet
            </button>
          </div>
        )}
      </div>
      
      {/* Create Bet Modal */}
      <CreateBetModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
};

export default BetsPage;