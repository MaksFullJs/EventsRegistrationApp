import React from 'react';
import { Card } from "antd";
import './EventItem.css';
import { NavLink } from "react-router-dom";

function EventItem({ id, title, description, date, organizer }) {

    const formattedDate = new Date(date).toLocaleString();


    return (
        <Card
            hoverable
            style={{ width: 400, borderRadius: '15px', borderColor: 'blue', paddingBottom: '5px' }}>

            <div className='event__info'>
                <div className='event__main_info'>
                    <h1 className='event__title'>{title}</h1>
                    <p>{formattedDate}</p>
                </div>
                <h3 className='event__desc'>{description}</h3>
                <h5>Organizer: {organizer}</h5>
                <div className='event__btn_block'>
                    <NavLink to={`/event/${id}/registration`}>
                        <button className='event__btn'>Register</button>
                    </NavLink>
                    <NavLink to={`/event/${id}/participants`}>
                        <button className='event__btn'>View</button>
                    </NavLink>
                </div>
            </div>

        </Card>
    );
}

export default EventItem;