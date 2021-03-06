import React, {useState, useEffect, createContext} from 'react';
import Topbar from './topbar.jsx';
import Sidebar from './sidebar.jsx';
import BodyWindow from './window.jsx';

export const TicketContext = createContext();

function App(props) {
  const [tickets, setTickets] = useState([])
  const [agents, setAgents] = useState([])
  const [contacts, setContacts] = useState([])


  const url = 'https://ticketmg.herokuapp.com';
  
  const getTickets = () => {
    fetch(`${url}/tickets`, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then((res) => res.json())
    .then(res => {
      setTickets(res.result)
    })
  }

  const getAgents = () => {
    fetch(`${url}/agents`, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then((res) => res.json())
    .then(res => {
      setAgents(res.result)
    })
  }

  const getContacts = (fn) => {
    fetch(`${url}/contacts`, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then((res) => res.json())
    .then((res) => {
      setContacts(res.result);
      fn();
    })
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  useEffect(() => { 
    getContacts(getTickets);
    getAgents();
    // getTickets();
  }, [])

  return (
    <div>
      <Topbar />
      <Sidebar />
      <div className='text-center m-2'>
        <h2>{capitalizeFirstLetter(props.page)}</h2>
      </div>
      <div className='mainContent'>
        <TicketContext.Provider value={{ticketValue: [tickets, setTickets], contactValue: [contacts, setContacts], agentValue: [agents, setAgents]}}>
          <BodyWindow page={props.page} />
        </TicketContext.Provider>
      </div>
    </div>
  );
}

export default App;
