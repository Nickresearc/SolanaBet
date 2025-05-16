import React, { useState } from 'react';
import { Activity, Users, Wallet, Trophy, Plus } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import MarketOverview from '../components/dashboard/MarketOverview';
import BetCard from '../components/cards/BetCard';
import { marketPrices, bets, currentUser } from '../utils/mockData';
import CreateBetModal from '../components/CreateBetModal';

const Dashboard: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Filter recent bets for display
  const recentBets = bets.slice(0, 3);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back, {currentUser.username}</p>
        </div>
        
        <button 
          className="btn-primary mt-4 md:mt-0"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus size={18} className="mr-2" />
          Create New Bet
        </button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard 
          title="Your Balance" 
          value={`${currentUser.balance.toFixed(2)} SOL`} 
          change={5.2} 
          icon={Wallet}
          iconBg="bg-primary-500/20"
        />
        <StatsCard 
          title="Active Bets" 
          value="3" 
          change={0} 
          icon={Activity}
          iconBg="bg-accent-500/20"
        />
        <StatsCard 
          title="Total Participants" 
          value="42" 
          change={12.8} 
          icon={Users}
          iconBg="bg-secondary-500/20"
        />
        <StatsCard 
          title="Win Rate" 
          value="64.7%" 
          change={3.5} 
          icon={Trophy}
          iconBg="bg-success-500/20"
        />
      </div>
      
      {/* Market Overview */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Market Overview</h2>
        <MarketOverview prices={marketPrices} />
      </div>
      
      {/* Recent Bets */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Recent Bets</h2>
          <button className="text-primary-400 hover:text-primary-300 text-sm font-medium">
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {recentBets.map((bet) => (
            <BetCard key={bet.id} bet={bet} />
          ))}
        </div>
      </div>
      
      {/* Create Bet Modal */}
      <CreateBetModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
};

export default Dashboard;