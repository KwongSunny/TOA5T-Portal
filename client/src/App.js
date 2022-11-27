import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import './App.modules.css';
import AnnouncementsPage from './AnnouncementsPage';

function App() {
  const [data, setData] = useState();
  const [token, setToken] = useState();
  const [tokenType, setTokenType] = useState();

  const [selectedServer, setSelectedServer] = useState();

  let mockServers = [{ guildName: "Mock's Server" }, { guildName: "Mock's Public Server" }]

  useEffect(() => {
    // fetch("/api")
    //   .then(res => res.json())
    //   .then(data => setData(data.message))

    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];
    setToken(accessToken);
    setTokenType(tokenType);

  }, [])

  useEffect(() => {
    if (token) {
      fetch('https://discord.com/api/users/@me', {
        headers: {
          authorization: `${tokenType} ${token}`
        }
      }).then(res => res.json())
      .then(data => setData(data))
    }
  },[token])

  console.log(data)

  return (
    <div className="App">
      {!token ? "No Token" : token}
      {!data ? "No User" : "User exists"}
      {!token ? "You are not logged in" : 
        <div className='serversAndProperties'>
          <div className='servers'>
            {mockServers.map(guild => <div className='server' onClick={() => setSelectedServer(guild)}>{guild.guildName}</div>)}
          </div>
          <div className='serverProperties'>
            <h3>{selectedServer?.guildName}</h3>
            <div className='serverPropertyTabs'>
              <span>General</span>
              <span>Roles</span>
              <span>Announcements</span>
            </div>
            <AnnouncementsPage />
          </div>
        </div>}
    </div>
  );
}

export default App;
