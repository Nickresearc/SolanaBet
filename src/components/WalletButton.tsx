import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { shortenAddress } from '../utils/formatters';

interface WalletButtonProps {
  compact?: boolean;
}

const WalletButton: React.FC<WalletButtonProps> = ({ compact = false }) => {
  const { connected, publicKey } = useWallet();

  if (connected && publicKey) {
    return (
      <button className={`btn-ghost ${compact ? 'p-2' : 'px-4 py-2'}`}>
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-success-500 mr-2 animate-pulse"></div>
          {!compact && <span>{shortenAddress(publicKey.toString())}</span>}
        </div>
      </button>
    );
  }

  return <WalletMultiButton className={compact ? 'btn-ghost p-2' : 'btn-primary'} />;
};

export default WalletButton;