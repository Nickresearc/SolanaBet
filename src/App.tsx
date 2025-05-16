import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import BetsPage from './pages/BetsPage';
import PoolsPage from './pages/PoolsPage';
import OptionsPage from './pages/OptionsPage';
import HistoryPage from './pages/HistoryPage';

// Import wallet adapter styles
import '@solana/wallet-adapter-react-ui/styles.css';

function App() {
  // Set up wallet configuration
  const endpoint = clusterApiUrl('devnet');
  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter()
  ];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Router>
            <div className="min-h-screen bg-dark-300 flex flex-col">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/bets" element={<BetsPage />} />
                  <Route path="/pools" element={<PoolsPage />} />
                  <Route path="/options" element={<OptionsPage />} />
                  <Route path="/history" element={<HistoryPage />} />
                </Routes>
              </main>
            </div>
          </Router>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;