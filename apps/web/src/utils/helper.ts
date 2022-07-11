//format the address display
export const formatAddress = (addr: string): string =>
  addr.length > 10 && addr.startsWith('0x') ? `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}` : addr

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

export const truncate = (str: string | undefined, length: number): string | undefined => {
  if (!str) {
    return str
  }
  if (str.length > length) {
    return `${str.substring(0, length - 3)}...`
  }
  return str
}

export const formatDate = (d: Date | undefined): string => (d ? d.toLocaleDateString('en-US') : '')

export const formatTime = (d: Date | undefined): string =>
  d
    ? d.toLocaleTimeString(undefined, {
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
      })
    : ''
