import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import './App.modules.css';
import AnnouncementsPage from './AnnouncementsPage';

function App() {
  const [data, setData] = useState();
  const [token, setToken] = useState(true);

  const [selectedServer, setSelectedServer] = useState();

  let mockServers = [{ guildName: "Mock's Server" }, { guildName: "Mock's Public Server" }]

  useEffect(() => {
    fetch("/api")
      .then(res => res.json())
      .then(data => setData(data.message))
  }, [])

  return (
    <div className="App">
      {!data ? "Loading..." : data}
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
