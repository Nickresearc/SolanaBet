import React from 'react';
import { 
  ArrowDown, 
  ArrowUp, 
  Clock, 
  Check, 
  AlertCircle,
  Coins,
  Wallet,
  Trophy,
  Disc
} from 'lucide-react';
import { transactions } from '../utils/mockData';
import { TransactionStatus, TransactionType } from '../types';
import { formatRelativeTime, shortenAddress } from '../utils/formatters';

const HistoryPage: React.FC = () => {
  const getTransactionIcon = (type: TransactionType) => {
    switch (type) {
      case TransactionType.DEPOSIT:
        return <ArrowDown size={18} className="text-success-400" />;
      case TransactionType.WITHDRAWAL:
        return <ArrowUp size={18} className="text-error-400" />;
      case TransactionType.BET_CREATION:
        return <Coins size={18} className="text-primary-400" />;
      case TransactionType.BET_MATCH:
        return <Disc size={18} className="text-accent-400" />;
      case TransactionType.BET_WIN:
        return <Trophy size={18} className="text-success-400" />;
      case TransactionType.BET_LOSS:
        return <Wallet size={18} className="text-error-400" />;
    }
  };
  
  const getTransactionStatus = (status: TransactionStatus) => {
    switch (status) {
      case TransactionStatus.PENDING:
        return (
          <div className="flex items-center text-warning-400">
            <Clock size={14} className="mr-1" />
            <span className="text-xs font-medium">Pending</span>
          </div>
        );
      case TransactionStatus.CONFIRMED:
        return (
          <div className="flex items-center text-success-400">
            <Check size={14} className="mr-1" />
            <span className="text-xs font-medium">Confirmed</span>
          </div>
        );
      case TransactionStatus.FAILED:
        return (
          <div className="flex items-center text-error-400">
            <AlertCircle size={14} className="mr-1" />
            <span className="text-xs font-medium">Failed</span>
          </div>
        );
    }
  };
  
  const getTransactionLabel = (type: TransactionType) => {
    switch (type) {
      case TransactionType.DEPOSIT:
        return 'Deposit to Wallet';
      case TransactionType.WITHDRAWAL:
        return 'Withdrawal from Wallet';
      case TransactionType.BET_CREATION:
        return 'Created Bet';
      case TransactionType.BET_MATCH:
        return 'Matched Bet';
      case TransactionType.BET_WIN:
        return 'Bet Win';
      case TransactionType.BET_LOSS:
        return 'Bet Loss';
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Transaction History</h1>
        <p className="text-gray-400 mt-1">View your betting activity and transactions</p>
      </div>
      
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-dark-300">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Details</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-100">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-dark-300/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-dark-400 p-2 rounded-full mr-3">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <span className="text-sm font-medium text-white">
                        {getTransactionLabel(transaction.type)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.signature && (
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-300">Signature:</span>
                        <a 
                          href={`https://explorer.solana.com/tx/${transaction.signature}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-primary-400 hover:text-primary-300"
                        >
                          {shortenAddress(transaction.signature, 8)}
                        </a>
                      </div>
                    )}
                    {transaction.betId && (
                      <div className="text-sm text-gray-400">
                        Bet ID: <span className="text-gray-300">{transaction.betId}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className={`text-sm font-medium ${
                      transaction.type === TransactionType.DEPOSIT || transaction.type === TransactionType.BET_WIN
                        ? 'text-success-400'
                        : transaction.type === TransactionType.WITHDRAWAL || transaction.type === TransactionType.BET_LOSS
                        ? 'text-error-400'
                        : 'text-white'
                    }`}>
                      {transaction.type === TransactionType.DEPOSIT || transaction.type === TransactionType.BET_WIN
                        ? '+'
                        : transaction.type === TransactionType.WITHDRAWAL || transaction.type === TransactionType.BET_LOSS
                        ? '-'
                        : ''}
                      {transaction.amount.toFixed(2)} SOL
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-400">
                    {formatRelativeTime(transaction.timestamp)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {getTransactionStatus(transaction.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;