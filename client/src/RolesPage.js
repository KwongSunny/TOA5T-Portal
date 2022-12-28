import React, {useEffect, useState} from 'react';

function RolesPage(props) {
    const {guild} = props;

    const [guildChannelIds, setGuildChannelIds] = useState();
    const [currentChannelId, setCurrentChannelId] = useState();
    const [currentChannel, setCurrentChannel] = useState();

    useEffect(() => {
        fetch(`/toastGuilds/${guild.id}`)
            .then(res => res.json())
            .then(data => {
                setGuildChannelIds(data.channels);
            })
    },[])

    useEffect(() => {
        if (currentChannelId) {
            fetch(`/toastChannels/${currentChannelId}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setCurrentChannel(data);
                })
        }

    }, [currentChannelId])

    return(
        <div>
            Roles
            <div>
                Channel ID: 
                <select onChange ={(e) => {setCurrentChannelId(e.target.value)}}>
                    <option></option>
                    {
                        guildChannelIds?.map(channel => <option key = {`channelOptions_${channel}`}>{channel}</option>)
                    }
                </select>
                <br />
                You have selected "{currentChannel.channelData.name}"

                <br />
                Message ID: <input type = "text" />
            </div>
        </div>
    )
}

export default RolesPage;