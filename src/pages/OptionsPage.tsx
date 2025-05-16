import React, { useState } from 'react';
import { Filter, Search, Plus } from 'lucide-react';
import OptionCard from '../components/cards/OptionCard';
import { options } from '../utils/mockData';

const OptionsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    asset: 'all' as string,
    type: 'all' as 'all' | 'call' | 'put',
  });
  
  // Get unique assets
  const uniqueAssets = [...new Set(options.map(option => option.asset))];
  
  // Filter options
  const filteredOptions = options.filter(option => {
    // Search filter
    if (searchQuery && !option.asset.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Asset filter
    if (filters.asset !== 'all' && option.asset !== filters.asset) {
      return false;
    }
    
    // Type filter
    if (filters.type !== 'all' && option.type !== filters.type) {
      return false;
    }
    
    return true;
  });
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Options Trading</h1>
          <p className="text-gray-400 mt-1">Buy and sell options contracts on various assets</p>
        </div>
        
        <button className="btn-primary mt-4 md:mt-0">
          <Plus size={18} className="mr-2" />
          Create New Option
        </button>
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search options..."
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
              value={filters.asset}
              onChange={(e) => setFilters({...filters, asset: e.target.value})}
            >
              <option value="all">All Assets</option>
              {uniqueAssets.map(asset => (
                <option key={asset} value={asset}>{asset}</option>
              ))}
            </select>
            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          
          <div className="relative">
            <select
              className="input appearance-none pr-10 pl-9"
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value as any})}
            >
              <option value="all">All Types</option>
              <option value="call">Calls</option>
              <option value="put">Puts</option>
            </select>
            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>
      
      {/* Options Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option) => (
            <OptionCard key={option.id} option={option} />
          ))
        ) : (
          <div className="col-span-2 flex flex-col items-center justify-center py-16 text-center">
            <p className="text-gray-400 mb-2">No options found matching your criteria</p>
            <button className="btn-primary mt-2">
              <Plus size={18} className="mr-2" />
              Create New Option
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OptionsPage;