//format the address display
export const formatAddress = (address: string) => {
  const len = address.length
  return address.substring(0, 5) + '...' + address.substring(len - 4, len)
}
//check if the address is valid
export const isValidAddr = (address: string) => {
  const re = /^0x[a-fA-F0-9]{40}$/
  return address.match(re)
}

export const isSameAddr = (addr1: string, addr2: string) => {
  if (isValidAddr(addr1) && isValidAddr(addr2)) {
    return addr1.toLowerCase() === addr2.toLowerCase() ? true : false
  }
  return false
}

// Replace IPFS address
export const replaceIPFS = (url: string = '') => {
  return url
    .replace('ipfs://ipfs/', 'https://ipfs.io/ipfs/') // case: ipfs://ipfs/xyz/image.png
    .replace('ipfs://', 'https://ipfs.io/ipfs/') // case: ipfs://xyz/1.gif
}

// decode tokenUri (base64/utf8)
export const decodeNftTokenUri = (data: string = '') => {
  try {
    const [header, ...body] = data.split(',')
    const [_, encoding] = header.split(';')
    const content = Buffer.from(body.toString(), encoding as BufferEncoding).toString()
    return JSON.parse(content)
  } catch (err: any) {
    console.warn(err.message)
    return {}
  }
}
