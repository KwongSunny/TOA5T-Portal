import React, { useState, useEffect } from "react";
import './App.modules.css';
import AnnouncementsPage from './AnnouncementsPage';
import GeneralPage from "./GeneralPage";
import RolesPage from "./RolesPage";

function App() {
  const [data, setData] = useState();
  const [userGuilds, setUserGuilds] = useState();
  const [toastGuilds, setToastGuilds] = useState();

  const [token, setToken] = useState();
  const [tokenType, setTokenType] = useState();

  const [currentGuild, setCurrentGuild] = useState(userGuilds?userGuilds[0]:undefined);
  const [currentPage, setCurrentPage] = useState("general");
  
  useEffect(() => {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];
    setToken(accessToken);
    setTokenType(tokenType);

    fetch('/toastGuilds')
      .then(res => res.json())
      .then(data => {
        console.log("fetch /toastguilds: ", data.guilds);
        setToastGuilds(data.guilds)})

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

  return (
    <div className="App">
      {!token ? 
        <div>You are not logged in, Please authorize your Discord Account:
          <br />
          <a href = "https://discord.com/api/oauth2/authorize?client_id=795736084327301160&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=token&scope=identify%20guilds">Authorize</a>
        </div>
        : 
        <div className='serversAndProperties'>
          <div className='servers'>
            {userGuilds?.map(guild => {
              //only list guilds in which the user is an admin of and TOA5T is in.
              if(guild.permissions === "4398046511103" && toastGuilds?.includes(guild.id))
                return <div className='server' key = {guild.id} onClick={() => setCurrentGuild(guild)}>{guild.name}</div>
            })}
          </div>
          <div className='serverProperties'>
            <h3>{currentGuild?.name}</h3>
            <div className='serverPropertyTabs'>
              <span onClick={() => {setCurrentPage("general")}}>General</span>
              <span onClick={() => {setCurrentPage("roles")}}>Roles</span>
              <span onClick={() => {setCurrentPage("announcements")}}>Announcements</span>
            </div>
            {currentPage === "general" && <GeneralPage />} 
            {currentPage === "roles" && currentGuild && <RolesPage guild = {currentGuild}/>}
            {currentPage === "announcements" && <AnnouncementsPage />}
          </div>
        </div>}
    </div>
  );
}

export default App;
