import { useState, useContext, useCallback, createContext, FC } from 'react'
import Web3Modal from 'web3modal'
import { Web3Provider } from '@ethersproject/providers'
import CyberConnect from '@cyberlab/cyberconnect'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { useTheme } from '@mui/material/styles'
import { useLocalStorage } from 'usehooks-ts'
import { ALCHEMY_RPC_ETH } from '../app/config'

interface Web3ContextInterface {
  disconnect: () => Promise<void>
  connectWallet: () => Promise<void>
  address: string
  domain: string | null
  avatar: string | null
  cyberConnect: CyberConnect | null
  provider: Web3Provider | undefined
}

export const Web3Context = createContext<Web3ContextInterface>({
  disconnect: async () => undefined,
  connectWallet: async () => undefined,
  address: '',
  domain: '',
  avatar: '',
  cyberConnect: null,
  provider: undefined,
})

export const Web3ContextProvider: FC<any> = ({ children }) => {
  const theme = useTheme()
  const [_, setConnected] = useLocalStorage('WEB3_CONNECT_CACHED_PROVIDER', null)
  const [address, setAddress] = useState<string>('')
  const [domain, setDomain] = useState<string | null>('')
  const [avatar, setAvatar] = useState<string | null>('')
  const [cyberConnect, setCyberConnect] = useState<CyberConnect | null>(null)
  const [provider, setProvider] = useState<Web3Provider>()

  const initCyberConnect = useCallback((provider: any) => {
    const cyberConnect = new CyberConnect({
      provider,
      namespace: 'CyberGraph',
    })

    setCyberConnect(cyberConnect)
  }, [])

  async function getEnsByAddress(provider: Web3Provider, address: string) {
    try {
      const ens = await provider.lookupAddress(address)
      return ens
    } catch (e) {
      return ''
    }
  }
  async function getAvatarByAddress(provider: Web3Provider, address: string) {
    try {
      const avatar = await provider.getAvatar(address)
      return avatar
    } catch (e) {
      return ''
    }
  }

  const providerOptions = {
    injected: {
      package: null,
    },
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          1: ALCHEMY_RPC_ETH,
        },
      },
    },
  }

  const connectWallet = async () => {
    const web3Modal = new Web3Modal({
      theme: theme.palette.mode,
      network: 'mainnet',
      cacheProvider: true,
      providerOptions: {},
    })

    try {
      const instance = await web3Modal.connect()
      const provider = new Web3Provider(instance)
      const signer = provider.getSigner()
      const address = await signer.getAddress()
      const domain = await getEnsByAddress(provider, address)
      const avatar = await getAvatarByAddress(provider, address)

      setAddress(address)
      setDomain(domain)
      setAvatar(avatar)
      setProvider(provider)
      initCyberConnect(provider.provider)
    } catch (error) {
      disconnect()
    }
  }

  const disconnect = useCallback(async () => {
    setConnected(null)
    setAddress('')
    setDomain('')
    setAvatar('')
    setProvider(undefined)
    setCyberConnect(null)
  }, [])

  return (
    <Web3Context.Provider
      value={{
        disconnect,
        connectWallet,
        address,
        domain,
        avatar,
        provider,
        cyberConnect,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export const useWeb3 = () => {
  const web3 = useContext(Web3Context)
  return web3
}
