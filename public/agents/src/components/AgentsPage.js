  ////////////////////////////////////////////////////
 ///////         Agents Home Page             ///////
////////////////////////////////////////////////////

import React, { Component }     from 'react';
import axios                    from 'axios';
import AgentList                from './AgentList';
import SearchBar                from './SearchBar'; 
import AgentsAvailable          from './AgentsAvailable';
import uuidv1                   from 'uuid/v1';
import API                      from 'Common/utils/API';
import { BackHome }             from 'Common/navigation';
import {
  Widget,
  addResponseMessage,
  addLinkSnippet,
  addUserMessage,
  toggleWidget as chatWidgetToggleWidget,
} from 'react-chat-widget';


// chatwidget elements
let apiProfile = "https://strategicmessage.mybluemix.net"
//let apiProfile = "http://localhost:3200"
class App extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
       agents: [],
       isLoading: true,
       error: null,
       search: '',
       currentChattingAgent: []
      } 
      // binds 'this' to the updateSearch
      this.updateSearch = this.updateSearch.bind(this);
    };
    
    // fetches all the agents from the databases and setting the state
    componentDidMount() {
      // this.setState({ isLoading: true })
      API.agent.getAll()
        .then(res => this.setState({ agents: res.data, isLoading: false }))
        .catch(error => this.setState({ error, isLoading: false }));
    };
    // handles the incoming messages
    handleNewUserMessage = (newMessage) => {
      axios.post(apiProfile + '/api/sms', {
          MessageSid: uuidv1(),
          SmsSid:uuidv1(),
          AccountSid: uuidv1(),
          MessagingServiceSid: uuidv1(),
          From: "+12017586357",
          To: "+19148195104",
          Body: newMessage,
          NumMedia: "",
          NumSegments: "",
          MediaContentType: " ",
          MediaUrl: " ",
          FromCity:"Charlotte",
          FromState: "NC",
          FromZip: "28222",
          FromCounty: "USA",
          SmsStatus: "",
          ToCity: "Charlotte",
          ToState: "NC",
          ToZip: "28222",
          ToCountry: "USA",
          AddOns: " ",
          ApiVersion: "v1",
          PostDate: Date.now(),
          ChaoticSid: uuidv1(),
          ChaoticSource: "web" 
        })
        .then(response => {          
          response.data.forEach((r) => {
            console.log(r)
            let rKey = Object.keys(r)[0]
            let message = r[rKey]
            addResponseMessage(message)
       
         })
         
       })
      
      /*(res => { 
          let random = Math.round(Math.random());
          addResponseMessage(`${res.data.response.reply[random].msg}`);
        });
        */
    }
    
    // setting the state.search to the typed in value
    updateSearch(event) {
      this.setState({ search: event.target.value.trim() });
    }
    
    // render the Search Results (as the user types in)
    renderSearchResults() {
      let filteredAgents = this.state.agents.filter(agent => 
        ( agent.name.includes(this.state.search.toLowerCase()) ));
    
   // if filtered > 0 => render results
      if( filteredAgents.length > 0 ) {
          return (
            <div>
              <AgentsAvailable qty={ filteredAgents.length }  />
              <AgentList 
                agents={ filteredAgents } 
                onAgentClick={ this.props.onAgentClick } 
                onAgentChatClick={this.onAgentChatClick.bind(this)}
              /> 
              <Widget
                handleNewUserMessage={ this.handleNewUserMessage }
                autofocus={true}
                subtitle={`Agent ${ this.state.currentChattingAgent.name } is here to help you`}
                profileAvatar={ this.state.currentChattingAgent.avatar }
              />
            </div>
          ) 
   // if = 0 => shows 'not found' message
        } else {
        return (
          <p className="noFoundAgent">
            Cant find an agent with the given name...
          </p>
        )
    } 
  } 

  handleClick() {
    chatWidgetToggleWidget();
  }

  // setting the state for the currently chatting agent
  onAgentChatClick(agent) {
    // console.log(agent);
    this.setState({ currentChattingAgent: agent })
    chatWidgetToggleWidget();
  }
    
  // main render component 
    render() {
     
      // if data is still being fetched
     if(this.state.isLoading) {
        return <p className="loading">Loading ...</p>;
      }
      
      return ( 
        
        <div>
          <BackHome />    
          {/*  search bar component passes the state.search value */}
            <SearchBar
              value={ this.state.search }
              updateSearch={ this.updateSearch }
             /> 

          {/* if state.search value is empty => renders all the agents in the state  */}
            { !this.state.search ? (
              <div>
                <AgentsAvailable qty={ this.state.agents.length } />
                <AgentList
                  agents={ this.state.agents }
                  onAgentClick={ this.props.onAgentClick }
                  onAgentChatClick={this.onAgentChatClick.bind(this)}
                />
                <Widget
                  handleNewUserMessage={ this.handleNewUserMessage }
                  autofocus={true}
                  subtitle={`Agent ${ this.state.currentChattingAgent.name } is here to help you`}
                  profileAvatar={ this.state.currentChattingAgent.avatar }
                />
              </div>
            ) : (
              <div> 
                { this.renderSearchResults() }
              </div>
            )}  
        </div>
      );
    } 
  }
  
  export default App;