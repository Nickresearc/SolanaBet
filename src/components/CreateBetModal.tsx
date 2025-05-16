import React, { useState } from 'react';
import { Calendar, ChevronDown, Coins, Info, X } from 'lucide-react';
import { BetCategory, BetType } from '../types';

interface CreateBetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateBetModal: React.FC<CreateBetModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [betType, setBetType] = useState<BetType>(BetType.P2P);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: BetCategory.CRYPTO,
    amount: '',
    odds: '',
    resolveDate: ''
  });
  
  if (!isOpen) return null;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    onClose();
  };
  
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-dark-200 border border-dark-100 rounded-xl shadow-xl max-w-2xl w-full mx-4 overflow-hidden animate-in fade-in">
        <div className="flex justify-between items-center border-b border-dark-100 p-4">
          <h2 className="text-lg font-semibold">Create New Bet</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        
        {/* Progress indicator */}
        <div className="flex border-b border-dark-100">
          <div 
            className={`w-1/3 text-center py-3 text-sm font-medium ${
              step >= 1 ? 'text-primary-400 border-b-2 border-primary-500' : 'text-gray-400'
            }`}
          >
            1. Bet Type
          </div>
          <div 
            className={`w-1/3 text-center py-3 text-sm font-medium ${
              step >= 2 ? 'text-primary-400 border-b-2 border-primary-500' : 'text-gray-400'
            }`}
          >
            2. Bet Details
          </div>
          <div 
            className={`w-1/3 text-center py-3 text-sm font-medium ${
              step >= 3 ? 'text-primary-400 border-b-2 border-primary-500' : 'text-gray-400'
            }`}
          >
            3. Confirm
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Step 1: Bet Type */}
          {step === 1 && (
            <div className="p-6">
              <p className="text-gray-400 mb-4">
                Select the type of bet you want to create:
              </p>
              
              <div className="space-y-4">
                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    betType === BetType.P2P 
                      ? 'border-primary-500 bg-primary-500/10' 
                      : 'border-dark-100 hover:border-gray-600'
                  }`}
                  onClick={() => setBetType(BetType.P2P)}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        betType === BetType.P2P ? 'border-primary-500' : 'border-gray-600'
                      }`}>
                        {betType === BetType.P2P && (
                          <div className="w-2.5 h-2.5 rounded-full bg-primary-500"></div>
                        )}
                      </div>
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium">Peer-to-Peer Bet</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        Create a direct bet between you and another user. You set the terms, stake, and odds.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    betType === BetType.POOL 
                      ? 'border-primary-500 bg-primary-500/10' 
                      : 'border-dark-100 hover:border-gray-600'
                  }`}
                  onClick={() => setBetType(BetType.POOL)}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        betType === BetType.POOL ? 'border-primary-500' : 'border-gray-600'
                      }`}>
                        {betType === BetType.POOL && (
                          <div className="w-2.5 h-2.5 rounded-full bg-primary-500"></div>
                        )}
                      </div>
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium">Betting Pool</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        Create a pool where multiple users can participate. The pot is shared among winners based on their stake.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div 
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    betType === BetType.OPTION 
                      ? 'border-primary-500 bg-primary-500/10' 
                      : 'border-dark-100 hover:border-gray-600'
                  }`}
                  onClick={() => setBetType(BetType.OPTION)}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        betType === BetType.OPTION ? 'border-primary-500' : 'border-gray-600'
                      }`}>
                        {betType === BetType.OPTION && (
                          <div className="w-2.5 h-2.5 rounded-full bg-primary-500"></div>
                        )}
                      </div>
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium">Options Contract</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        Create an options contract with defined strike price, expiry date, and premium.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 2: Bet Details */}
          {step === 2 && (
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="Enter a clear title for your bet"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="input min-h-[100px]"
                    placeholder="Provide details about the bet conditions and outcome determination"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Category
                  </label>
                  <div className="relative">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="input appearance-none pr-10"
                      required
                    >
                      <option value={BetCategory.CRYPTO}>Cryptocurrency</option>
                      <option value={BetCategory.SPORTS}>Sports</option>
                      <option value={BetCategory.POLITICS}>Politics</option>
                      <option value={BetCategory.ESPORTS}>Esports</option>
                      <option value={BetCategory.CUSTOM}>Custom</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Stake Amount (SOL)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        className="input pr-10"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        required
                      />
                      <Coins size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Odds
                    </label>
                    <input
                      type="number"
                      name="odds"
                      value={formData.odds}
                      onChange={handleInputChange}
                      className="input"
                      placeholder="2.0"
                      step="0.1"
                      min="1"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Resolution Date
                  </label>
                  <div className="relative">
                    <input
                      type="datetime-local"
                      name="resolveDate"
                      value={formData.resolveDate}
                      onChange={handleInputChange}
                      className="input pr-10"
                      required
                    />
                    <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center bg-dark-300 p-3 rounded-lg mt-6">
                <Info size={16} className="text-primary-400 mr-2 flex-shrink-0" />
                <p className="text-xs text-gray-400">
                  All bets are secured by smart contracts on the Solana blockchain. 
                  Funds will be locked in the contract until the bet is resolved.
                </p>
              </div>
            </div>
          )}
          
          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="p-6">
              <p className="text-gray-300 mb-4">
                Please review your bet details before creating:
              </p>
              
              <div className="bg-dark-300 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Type:</span>
                  <span className="font-medium">
                    {betType === BetType.P2P ? 'Peer-to-Peer' : 
                     betType === BetType.POOL ? 'Betting Pool' : 'Options Contract'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Title:</span>
                  <span className="font-medium">{formData.title}</span>
                </div>
                
                <div className="pt-2 border-t border-dark-100">
                  <span className="text-gray-400">Description:</span>
                  <p className="mt-1 text-sm">{formData.description}</p>
                </div>
                
                <div className="flex justify-between pt-2 border-t border-dark-100">
                  <span className="text-gray-400">Category:</span>
                  <span className="font-medium">{formData.category}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Stake Amount:</span>
                  <span className="font-medium">{formData.amount} SOL</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Odds:</span>
                  <span className="font-medium">x{formData.odds}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Resolution Date:</span>
                  <span className="font-medium">{new Date(formData.resolveDate).toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex items-center bg-primary-900/30 p-3 rounded-lg mt-6 border border-primary-800">
                <Info size={16} className="text-primary-400 mr-2 flex-shrink-0" />
                <p className="text-xs text-primary-100">
                  By creating this bet, {formData.amount} SOL will be transferred from your wallet to the smart contract.
                  Gas fees will apply.
                </p>
              </div>
            </div>
          )}
          
          {/* Modal Footer */}
          <div className="border-t border-dark-100 p-4 flex justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="btn-outline"
              >
                Back
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="btn-outline"
              >
                Cancel
              </button>
            )}
            
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                className="btn-primary"
              >
                Create Bet
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBetModal;