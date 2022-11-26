import React from 'react';
import "./AnnouncementsPage.modules.css";
import AnnouncementToggle from './components/AnnouncementToggle';

function AnnouncementsPage() {

    const mockAnnouncements =
        [
            { announcementName: "Monthly Reminder", content: "End of the month reminder" },
            { announcementName: "Weekly Reminder", content: "End of the week reminder" },
        ];

    return (
        <div>
            Announcements
            <div className='announcementOptions'>
                <span>Add</span>
            </div>
            <div className="announcementListHeader">
                <span>Name</span>
                <span>Channel</span>
                <span>Content</span>
                <span>Next Occurence in</span>
                <span>Active</span>
            </div>
            <div className='announcementList'>
                {mockAnnouncements.map(announcement => <div><AnnouncementToggle announcement = {announcement}/></div>)}
            </div>
        </div>
    )
}

const addAnnouncement = () => {

}

export default AnnouncementsPage;