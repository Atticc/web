import { WEB3_STORAGE_API_TOKEN } from '@app/config'
import { Web3Storage } from 'web3.storage'

export const useWeb3Storage = (): Web3Storage => {
  const client = new Web3Storage({ token: WEB3_STORAGE_API_TOKEN, endpoint: new URL('https://api.web3.storage') })
  if (client === undefined) {
    throw new Error('initialize Web3 Storage failure')
  }
  return client
}

export default useWeb3Storage
