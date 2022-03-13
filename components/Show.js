import React from 'react'
import Conversation from './conversation'
import ConversationNav from './conversationNav'

const Show = (props) => {
  return (
    <div className='md:border-l min-h-screen border-iceWhite border-opacity-20'>
      <ConversationNav />
      <Conversation />
        
    </div>
  )
}

export default Show