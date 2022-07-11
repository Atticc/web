import axios from 'axios'
import { POAP_API_URL } from '../app/config'

function serialize(data: any) {
  return Object.keys(data)
    .map((keyName) => `${encodeURIComponent(keyName)}=${data[keyName] ? encodeURIComponent(data[keyName]) : ''}`)
    .join('&')
}

export const toResultObject = (promise: any) => {
  return promise.then((result: any) => ({ success: true, result })).catch((error: Error) => ({ success: false, error }))
}

export async function request({
  baseUrl = POAP_API_URL,
  endpoint = '',
  data = null,
  method = 'GET',
  contentType = 'application/json',
  appendToken = false,
  isInvite = false,
  ...config
}) {
  let url = `${baseUrl}/${endpoint}`
  url = method === 'GET' && data !== null ? `${url}?${serialize(data)}` : url

  const options = {
    url,
    method,
    data:
      data === null || method === 'GET' ? undefined : contentType === 'application/json' ? JSON.stringify(data) : data,
    headers: {
      Accept: 'application/json',
      'Content-Type': contentType,
    },
    ...config,
  }

  return axios.request(options)
}

export const POAP = {
  getNFTs: ({ address }: { address: string }) =>
    request({
      endpoint: `actions/scan/${address}`,
    }),
}
