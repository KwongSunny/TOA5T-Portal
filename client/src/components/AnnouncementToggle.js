import React from 'react';
import "./AnnouncementToggle.modules.css"

function AnnouncementToggle (props) {
    const announcement = props.announcement;

    return(<div className='AnnouncementToggle'>
        <div className = 'ToggleCollapsed'>
            <span>{announcement.announcementName}</span>
            <span>channel</span>
            <span>{announcement.content}</span>
            <span>300s</span>
            <span><input type='checkbox'/></span>
        </div>
        <div className = 'ToggleExpanded'>

        </div>
    </div>)
}

export default AnnouncementToggle