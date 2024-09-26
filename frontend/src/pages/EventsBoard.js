import React from 'react';

import './EventsBoard.css';
import { getEvents } from '../api/api';
import { useState, useEffect } from 'react';
import EventItem from '../components/EventItem';
import { Pagination } from 'antd';

function EventsBoard() {

  const sortFilters = ['None', 'Date(asc)', 'Date(desc)', 'Title', 'Organizer'];
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [sortOrder, setSortOrder] = useState('none');
  const pageSize = 9;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        setEvents(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchEvents();
  }, []);

  
  useEffect(() => {

    let sortedEvents = [...events];

    if (sortOrder === 'Date(asc)') {
      sortedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
      console.log(sortedEvents);
    } else if (sortOrder === 'Date(desc)') {
      sortedEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOrder === 'Title') {
      sortedEvents.sort((a, b) => a.title.localeCompare(b.title));
    }  else if (sortOrder === 'Organizer') {
      sortedEvents.sort((a, b) => a.organizer.localeCompare(b.organizer));
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, sortedEvents.length);
    setCurrentEvents(sortedEvents.slice(startIndex, endIndex));

  }, [page, events, sortOrder]);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    console.log(e.target.value);
    setPage(1); 
  };




  return (
    <div className='container'>
      <select onChange={handleSortChange} style={{ marginBottom: '20px' }}> 
        {
          sortFilters.map((type) => <option key={type} value={type}>{type}</option>)
        }
      </select>
      <div className='catalog-block-with-card'>
        {currentEvents.map(({ id, title, description, date, organizer }, idx) => (
          <EventItem
            id={id}
            title={title}
            description={description}
            date={date}
            organizer={organizer}
            key={idx}
          />
        ))}
      </div>
      <Pagination
        align='center'
        total={events.length}
        current={page}
        onChange={(page) => setPage(page)}
      />
    </div>
  );
}

export default EventsBoard;
