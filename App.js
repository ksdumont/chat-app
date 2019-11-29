import React, {Component} from 'react';
import MessageList from './components/MessageList';
import './style.css';
// import Chatkit from '@pusher/chatkit-client';
import {tokenUrl, instanceLocator} from './config';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';
// import NewRoomForm from './components/NewRoomForm';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      joinableRooms: [],
      joinedRooms: []
      }
      this.sendMessage = this.sendMessage.bind(this)
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
      this.currentUser = currentUser;
      this.currentUser.getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms,
        })
      })
      .catch(err => console.log('error on joinableRooms: ', err))
      
      this.currentUser.subscribeToRoom({
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
    .catch(err => console.log('error on connecting: ', err))
  }
    
  sendMessage(text) {
      this.currentUser.sendMessage({
        text,
        roomId: '769e25cd-87d6-4e66-9eef-0122b9ce151f',

      })
    }
  render() { 
    return (
      <div className='app'>
        <RoomList rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}/>
        <MessageList messages={this.state.messages}/>
        <SendMessageForm sendMessage={this.sendMessage} />
        {/* <NewRoomForm />        */}
      </div>
      );
  }
}
 
export default App;


