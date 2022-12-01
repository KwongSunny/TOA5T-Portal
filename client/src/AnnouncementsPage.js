import React, {useState} from 'react';
import "./AnnouncementsPage.modules.css";
import AnnouncementToggle from './components/AnnouncementToggle';

function AnnouncementsPage() {

    const [selectedAnnouncement, setSelectedAnnouncement] = useState();

    const mockAnnouncements =
        [
            { announcementName: "Monthly Reminder", channel: "Announcements", content: "End of the month reminder", id: 1 },
            { announcementName: "Weekly Reminder", channel: "Announcements", content: "End of the week reminder", id: 2 },
        ];

    const addNewSchedule = () => {

    }

    return (
        <div>
            Announcements
            <div className='announcementOptions'>
                <button onClick={() => addNewSchedule()}>Add</button>
            </div>
            <div className="announcementListHeader">
                <span>Name</span>
                <span>Channel</span>
                <span>Content</span>
                <span>Next Occurence in</span>
                <span>Active</span>
            </div>
            <div className='announcementList'>
                {mockAnnouncements.map(announcement => <div key = {announcement.id}><AnnouncementToggle announcement = {announcement}/></div>)}
            </div>
        </div>
    )
}

const addAnnouncement = () => {

}

export default AnnouncementsPage;