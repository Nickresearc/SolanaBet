import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bed as Bet, BookOpen, ChevronDown, Coins, CreditCard, History, Home, Menu, UserCircle, X, LogOut, TrendingUp } from 'lucide-react';
import WalletButton from '../WalletButton';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const NavItem = ({ to, icon: Icon, label }: { to: string; icon: React.ElementType; label: string }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          isActive 
            ? 'text-white bg-primary-700/30' 
            : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`}
      >
        <Icon size={18} />
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 z-50 bg-dark-200/80 backdrop-blur-md border-b border-dark-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Bet className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                SolanaBet
              </span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-1">
              <NavItem to="/" icon={Home} label="Dashboard" />
              <NavItem to="/bets" icon={Coins} label="P2P Bets" />
              <NavItem to="/pools" icon={Bet} label="Betting Pools" />
              <NavItem to="/options" icon={TrendingUp} label="Options" />
              <NavItem to="/history" icon={History} label="History" />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <WalletButton />

            <div className="relative group">
              <button className="flex items-center gap-2 text-sm text-gray-300 bg-dark-400 hover:bg-dark-300 px-3 py-2 rounded-lg">
                <UserCircle size={18} />
                <span>0x7ba...3f9a</span>
                <ChevronDown size={16} />
              </button>
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-dark-200 border border-dark-100 ring-1 ring-black ring-opacity-5 hidden group-hover:block">
                <div className="py-1">
                  <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-dark-300 hover:text-white">
                    <UserCircle size={16} />
                    <span>Profile</span>
                  </Link>
                  <Link to="/wallet" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-dark-300 hover:text-white">
                    <CreditCard size={16} />
                    <span>Wallet</span>
                  </Link>
                  <Link to="/history" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-dark-300 hover:text-white">
                    <BookOpen size={16} />
                    <span>Transaction History</span>
                  </Link>
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-error-400 hover:bg-dark-300">
                    <LogOut size={16} />
                    <span>Disconnect</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center md:hidden">
            <WalletButton compact />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-dark-400"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-dark-200 border-b border-dark-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavItem to="/" icon={Home} label="Dashboard" />
            <NavItem to="/bets" icon={Coins} label="P2P Bets" />
            <NavItem to="/pools" icon={Bet} label="Betting Pools" />
            <NavItem to="/options" icon={TrendingUp} label="Options" />
            <NavItem to="/history" icon={History} label="History" />
            <NavItem to="/profile" icon={UserCircle} label="Profile" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;