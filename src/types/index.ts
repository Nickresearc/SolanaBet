export interface User {
  id: string;
  walletAddress: string;
  username: string;
  avatar: string;
  balance: number;
  betsCreated: number;
  betsWon: number;
}

export interface Bet {
  id: string;
  title: string;
  description: string;
  category: BetCategory;
  type: BetType;
  creator: {
    id: string;
    walletAddress: string;
    username: string;
  };
  amount: number;
  odds: number;
  totalStaked: number;
  participants: number;
  status: BetStatus;
  resolveDate: string;
  createdAt: string;
}

export enum BetCategory {
  CRYPTO = 'crypto',
  SPORTS = 'sports',
  POLITICS = 'politics',
  ESPORTS = 'esports',
  CUSTOM = 'custom',
}

export enum BetType {
  P2P = 'p2p',
  POOL = 'pool',
  OPTION = 'option',
}

export enum BetStatus {
  OPEN = 'open',
  MATCHED = 'matched',
  ACTIVE = 'active',
  SETTLED = 'settled',
  CANCELLED = 'cancelled',
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  timestamp: string;
  status: TransactionStatus;
  betId?: string;
  signature?: string;
}

export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
  BET_CREATION = 'bet_creation',
  BET_MATCH = 'bet_match',
  BET_WIN = 'bet_win',
  BET_LOSS = 'bet_loss',
}

export enum TransactionStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  FAILED = 'failed',
}

export interface PriceData {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
}

export interface PoolData {
  id: string;
  name: string;
  totalLiquidity: number;
  apr: number;
  userLiquidity?: number;
  participants: number;
}

export interface OptionsContract {
  id: string;
  asset: string;
  strikePrice: number;
  currentPrice: number;
  expiry: string;
  type: 'call' | 'put';
  premium: number;
  openInterest: number;
  status: 'active' | 'expired';
}