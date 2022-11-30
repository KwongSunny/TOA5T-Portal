import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import './App.modules.css';
import AnnouncementsPage from './AnnouncementsPage';

function App() {
  const [data, setData] = useState();
  const [userGuilds, setUserGuilds] = useState();
  const [toastGuilds, setToastGuilds] = useState();

  const [token, setToken] = useState();
  const [tokenType, setTokenType] = useState();

  const [selectedServer, setSelectedServer] = useState();

  let mockServers = [{ guildName: "Mock's Server", id: "1"}, { guildName: "Mock's Public Server", id:"2" }]

  useEffect(() => {
    // fetch("/api")
    //   .then(res => res.json())
    //   .then(data => setData(data.message))

    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];
    setToken(accessToken);
    setTokenType(tokenType);

    fetch('/toastGuilds')
      .then(res => {
        console.log(res);
        res.json()})
      .then(data => {
        console.log(data);
        setToastGuilds(data)})

  }, [])

  useEffect(() => {
    if (token) {
      //fetch user guilds
      fetch('https://discord.com/api/v10/users/@me/guilds', {
        headers: {
          authorization: `${tokenType} ${token}`
        }
      }).then(res => res.json())
      .then(data => {
        setUserGuilds(data)
      })
    }
  },[token])

  console.log("ToastGuilds: ", toastGuilds);


  return (
    <div className="App">
      {!token ? "You are not logged in, Please authorize your Discord Account: https://discord.com/api/oauth2/authorize?client_id=795736084327301160&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=token&scope=identify%20guilds" : 
        <div className='serversAndProperties'>
          <div className='servers'>
            {userGuilds?.map(guild => {
              //only list guilds in which the user is an admin of
              if(guild.permissions === "4398046511103")
                return <div className='server' key = {guild.id} onClick={() => setSelectedServer(guild)}>{guild.name}</div>
            })}
          </div>
          <div className='serverProperties'>
            <h3>{selectedServer?.name}</h3>
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
