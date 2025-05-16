import { Connection, clusterApiUrl, PublicKey, Transaction } from '@solana/web3.js';
import { WalletContextState } from '@solana/wallet-adapter-react';

// Initialize connection to Solana devnet
export const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

// Helper function to create and send a transaction
export async function sendTransaction(
  wallet: WalletContextState,
  transaction: Transaction,
  signers: Array<any> = []
): Promise<string> {
  if (!wallet.publicKey || !wallet.signTransaction) {
    throw new Error('Wallet not connected');
  }

  try {
    transaction.feePayer = wallet.publicKey;
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    
    if (signers.length > 0) {
      transaction.sign(...signers);
    }
    
    const signed = await wallet.signTransaction(transaction);
    const signature = await connection.sendRawTransaction(signed.serialize());
    await connection.confirmTransaction(signature);
    
    return signature;
  } catch (error) {
    console.error('Transaction failed:', error);
    throw error;
  }
}

// Helper function to get SOL balance
export async function getBalance(publicKey: PublicKey): Promise<number> {
  try {
    const balance = await connection.getBalance(publicKey);
    return balance / 1e9; // Convert lamports to SOL
  } catch (error) {
    console.error('Failed to get balance:', error);
    throw error;
  }
}