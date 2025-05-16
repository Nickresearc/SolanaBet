import React, { useState } from 'react';
import { Filter, Search, Plus } from 'lucide-react';
import PoolCard from '../components/cards/PoolCard';
import { pools } from '../utils/mockData';

const PoolsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'apr' | 'liquidity'>('apr');
  
  // Filter and sort pools
  const filteredPools = [...pools]
    .filter(pool => {
      if (!searchQuery) return true;
      return pool.name.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      if (sortOrder === 'apr') {
        return b.apr - a.apr;
      } else {
        return b.totalLiquidity - a.totalLiquidity;
      }
    });
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Betting Pools</h1>
          <p className="text-gray-400 mt-1">Stake in pools to participate in multiple bets</p>
        </div>
        
        <button className="btn-primary mt-4 md:mt-0">
          <Plus size={18} className="mr-2" />
          Create New Pool
        </button>
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search pools..."
            className="input pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        
        <div className="relative">
          <select
            className="input appearance-none pr-10 pl-9"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'apr' | 'liquidity')}
          >
            <option value="apr">Sort by APR</option>
            <option value="liquidity">Sort by Liquidity</option>
          </select>
          <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      
      {/* Pools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPools.length > 0 ? (
          filteredPools.map((pool) => (
            <PoolCard key={pool.id} pool={pool} />
          ))
        ) : (
          <div className="col-span-2 flex flex-col items-center justify-center py-16 text-center">
            <p className="text-gray-400 mb-2">No pools found matching your criteria</p>
            <button className="btn-primary mt-2">
              <Plus size={18} className="mr-2" />
              Create New Pool
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PoolsPage;