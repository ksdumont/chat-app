import React, {Component} from 'react';
import MessageList from './components/MessageList';
import './style.css';
// import Chatkit from '@pusher/chatkit-client';
import {tokenUrl, instanceLocator} from './config';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import SendMessageForm from './components/SendMessageForm';
// import RoomList from './components/RoomList';
// import NewRoomForm from './components/NewRoomForm';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      }
  }
  componentDidMount() {
    const chatManager = new ChatManager({
        instanceLocator,
        userId: 'ksdumont',
        tokenProvider: new TokenProvider({
          url: tokenUrl
        })
    })
    chatManager.connect()
    .then(currentUser => {
      currentUser.subscribeToRoom({
        roomId: '769e25cd-87d6-4e66-9eef-0122b9ce151f',
        hooks: {
          onMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            })
          }
        }
      })
    })
  }

  render() { 
    return (
      <div className='app'>
        {/* <RoomList /> */}
        <MessageList messages={this.state.messages}/>
        <SendMessageForm />
        {/* <NewRoomForm />        */}
      </div>
      );
  }
}
 
export default App;


