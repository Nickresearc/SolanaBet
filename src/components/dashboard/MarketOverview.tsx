import React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { PriceData } from '../../types';

interface MarketOverviewProps {
  prices: PriceData[];
}

const MarketOverview: React.FC<MarketOverviewProps> = ({ prices }) => {
  return (
    <div className="glass-card overflow-hidden">
      <div className="p-4 border-b border-dark-100">
        <h2 className="font-semibold text-white">Market Overview</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-dark-300">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Asset</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">24h Change</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">24h Volume</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-100">
            {prices.map((price) => (
              <tr key={price.symbol} className="hover:bg-dark-300/50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <img 
                      src={`https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/${price.symbol.toLowerCase()}/logo.png`}
                      alt={price.symbol}
                      className="w-6 h-6 rounded-full bg-dark-100"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/24/7928FF/FFFFFF?text=${price.symbol[0]}`;
                      }}
                    />
                    <span className="ml-2 font-medium text-white">{price.symbol}</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right font-medium text-white">
                  ${price.price.toFixed(2)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <div className={`inline-flex items-center ${
                    price.change24h >= 0 ? 'text-success-400' : 'text-error-400'
                  }`}>
                    {price.change24h >= 0 ? (
                      <TrendingUp size={14} className="mr-1" />
                    ) : (
                      <TrendingDown size={14} className="mr-1" />
                    )}
                    <span className="font-medium">{Math.abs(price.change24h).toFixed(2)}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right font-medium text-gray-300">
                  ${(price.volume24h / 1000000).toFixed(2)}M
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketOverview;