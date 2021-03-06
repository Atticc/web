import { useContext } from 'react'
import { WalletContext, WalletContextType } from './WalletProvider'

const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within an WalletProvider')
  }
  return context
}

export default useWallet
