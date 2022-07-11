import { CircularProgress, Grid, Stack, Tab, Tabs, Typography, useTheme } from '@mui/material'
import { useXmtp } from '@utils/useXmtp'
import { useEffect, useState } from 'react'
import { useConnections } from '@req/cyberconnect/queries/getConnections'
import { isValidAddr } from '@utils/helper'
import ConversationFriendListItem from './ConversationFriendListItem'
import useWallet from '@utils/useWallet'
import ConversationsList from './ConversationList'
import { PrimaryDarkButton } from '@c/buttons/Buttons'
import { IUser } from '@app/constants'

type ConversationPanelProps = {
  onConnect?: () => Promise<void>
}

export enum ConversationListType {
  messages = 'messages',
  friends = 'friends',
}

const tabs = [
  { label: 'Messages', value: ConversationListType.messages },
  { label: 'Friends', value: ConversationListType.friends },
]

export const ConversationPanel = ({ onConnect }: ConversationPanelProps) => {
  const colorTheme = useTheme().palette
  const { address } = useWallet()
  const [tab, setTab] = useState<ConversationListType>(ConversationListType.messages)
  const [friends, setFriends] = useState([])
  const { data: connections, refetch: refetchConnection, isLoading } = useConnections({ address: String(address), first: 100 })
  const { conversations, loadingConversations, client } = useXmtp()

  const handleSetTab = (_: React.ChangeEvent<{}>, value: ConversationListType) => {
    console.log(value)
    setTab(value)
  }

  useEffect(() => {
    if (connections) {
      setFriends(connections?.friends?.list)
    } else {
      setFriends([])
    }
  }, [connections])

  useEffect(() => {
    if (isValidAddr(String(address))) {
      refetchConnection()
    } else {
      setFriends([])
    }
  }, [address])

  const renderFriends = () => {
    if(isLoading) {
      return <CircularProgress />
    }
    
    return friends?.length > 0 
      ? friends.map((f: IUser) => <ConversationFriendListItem user={f} key={f.address} />) 
      : <Typography>No Friends...</Typography>
  }

  const renderConversations = () => {
    if (!address || !client) {
      return <Typography>Sign In required...</Typography>
    }

    if (loadingConversations) {
      return <CircularProgress />
    }

    return conversations?.length > 0 ? (
      <ConversationsList conversations={conversations} />
    ) : (
      <Typography>No Conversations...</Typography>
    )
  }

  return (
    <Grid container direction={'column'} sx={{ paddingY: 1 }}>
      {!client ? <PrimaryDarkButton textcontent={'Connect'} onClick={onConnect} /> : null}
      <Grid item>
        <Tabs value={tab} onChange={handleSetTab} aria-label="Post Tabs" variant="fullWidth">
          {tabs.map((t) => (
            <Tab label={`${t.label}`} value={t.value} key={t.label} />
          ))}
        </Tabs>
      </Grid>
      <Grid item key={tab}>
        {tab == ConversationListType.friends ? renderFriends() : renderConversations()}
      </Grid>
    </Grid>
  )
}

export default ConversationPanel
