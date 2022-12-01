import React, { useState } from 'react';
import "./AnnouncementToggle.modules.css"

function AnnouncementToggle(props) {
    const [collapsed, setCollapsed] = useState(true)

    const [hour, setHour] = useState(12);
    const [minute, setMinute] = useState(0);
    const [meridiem, setMeridiem] = useState("AM")
    const [dayFrequency, setDayFrequency] = useState("every day")
    const [date, setDate] = useState();

    const announcement = props.announcement;

    const IncrementHour = (increment) => {
        let val = hour + increment;
        if(val < 1) val = 12;
        if(val > 12) val = 1;
        setHour(val);
    }
    const IncrementMinute = (increment) => {
        let val = minute + increment;
        if(val < 0) val = 59;
        if(val > 59) val = 0;
        setMinute(val);
    }

    const SwitchMeridiem = () => {
        setMeridiem(meridiem==="AM"?"PM":"AM")
    }

    const SwitchFrequency = (val) => {
        console.log(val);
        switch(val){
            case "every day" : setDayFrequency("every week"); break;
            case "every week" : setDayFrequency("every month"); break;
            case "every month" : setDayFrequency("on January"); break;
            case "on January" : setDayFrequency("on February"); break;
            case "on February" : setDayFrequency("on March"); break;
            case "on March" : setDayFrequency("on April"); break;
            case "on April" : setDayFrequency("on May"); break;
            case "on May" : setDayFrequency("on June"); break;
            case "on June" : setDayFrequency("on July"); break;
            case "on July" : setDayFrequency("on August"); break;
            case "on August" : setDayFrequency("on September"); break;
            case "on September" : setDayFrequency("on October"); break;
            case "on October" : setDayFrequency("on November"); break;
            case "on November" : setDayFrequency("on December"); break;
            case "on December" : setDayFrequency("every day"); break;
        }
    }

    return (
        <div className = 'AnnouncementToggle'>
            <div className = 'ToggleCollapsed' onClick={() => { setCollapsed(!collapsed) }}>
                <span>{announcement.announcementName}</span>
                <span>{announcement.channel}</span>
                <span>{announcement.content}</span>
                <span>300s</span>
                <span><input type = 'checkbox'/></span>
            </div>
            {!collapsed && <div className = 'ToggleExpanded'>
                Name: <input type = "text" defaultValue={announcement.announcementName}></input>
                Channel: <select>
                    {/* guildChannels.map */}
                </select>

                <br />Message: <input type = "text" defaultValue={announcement.content}></input>
                <br />
                <br />Rules:
                <br /><button onClick = {() => {}}>Add a New Rule</button>
                <hr />
                <div className = "NewRuleTemplate">
                    <span onClick={() => IncrementHour(1)}>/\</span>  
                    <span></span>  
                    <span onClick={() => IncrementMinute(1)}>/\</span>         
                    <span onClick={() => SwitchMeridiem()}>/\</span>           
                    <span></span>             
                    <span>/\</span>
                </div>
                <div className = "NewRuleTemplate">
                    <span>{hour}</span>  
                    <span>:</span>          
                    <span>{minute}</span>   
                    <span>{meridiem}</span>    
                    <span>{dayFrequency}</span> 
                    <span>{date}</span>
                </div>
                <div className = "NewRuleTemplate">
                    <span onClick={() => IncrementHour(-1)}>\/</span>  
                    <span></span>   
                    <span onClick={() => IncrementMinute(-1)}>\/</span>         
                    <span onClick={() => SwitchMeridiem()}>\/</span>           
                    <span onClick = {() => SwitchFrequency(dayFrequency)}>\/</span>             
                    <span>\/</span>
                </div>
            </div>}
        </div>)
}

export default AnnouncementToggle