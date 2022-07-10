//src\utils\helper.ts

//format the address display
export const formatAddress = (address: string) => {
  const len = address.length
  return address.substr(0, 5) + '...' + address.substring(len - 4, len)
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
