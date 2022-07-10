import { render, screen } from '@testing-library/react'
import { NftItem } from '../NftItem'
import '@testing-library/jest-dom'
import { Nft } from '@alch/alchemy-web3'

describe('Home', () => {
  const nft: Nft = {
    contract: { address: '0x042e2998a2995a349894eb2e0a0b9c8e879bd396' },
    id: {
      tokenId: '0x0000000000000000000000000000000000000000000000000000000000000001',
      tokenMetadata: { tokenType: 'erc721' }
    },
    balance: '1',
    title: '',
    description: '',
    tokenUri: {
      raw: 'data:application/json;utf8,{"name":"Love","created_by":"The People","description":"They ask for equal dignity in the eyes of the law. The Constitution grants them that right.","image":"https://arweave.net/8HFryd60PvyHUWV_3KjdUWkBR8KtZ8p6aBANGWzbIBw","image_url":"https://arweave.net/8HFryd60PvyHUWV_3KjdUWkBR8KtZ8p6aBANGWzbIBw"}',
      gateway: 'data:application/json;utf8,{"name":"Love","created_by":"The People","description":"They ask for equal dignity in the eyes of the law. The Constitution grants them that right.","image":"https://arweave.net/8HFryd60PvyHUWV_3KjdUWkBR8KtZ8p6aBANGWzbIBw","image_url":"https://arweave.net/8HFryd60PvyHUWV_3KjdUWkBR8KtZ8p6aBANGWzbIBw"}'
    },
    media: [{ "raw": "", "gateway": "" }],
    metadata: {},
    timeLastUpdated: '2022-02-07T05:08:39.229Z'
  }
  it('It should render an img', () => {
    render(<NftItem nft={nft} size={80} />)

    const Img = screen.getByRole('img')

    // const heading = screen.getByRole('heading', {
    //   name: /welcome to next\.js!/i,
    // })

    expect(Img).toBeInTheDocument()
  })
})