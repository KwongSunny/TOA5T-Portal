import React, {useEffect, useState} from 'react';

function RolesPage(props) {
    const {guild} = props;

    const [emojis, setEmojis] = useState();
    const [roles, setRoles] = useState();

    useEffect(() => {
        fetch(`/toastGuilds/${guild.id}`)
    },[])

    return(
        <div>
            Roles
            <div>
                Message ID: <input type="text" />
            </div>
        </div>
    )
}

export default RolesPage;