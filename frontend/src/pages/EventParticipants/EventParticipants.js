import ParticipantItem from "../../components/ParticipantItem/ParticipantItem";

import { getEventParticipants, getEvent } from '../../api/api'
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';


function EventParticipants() {

    const [participants, setParticipants] = useState([]);
    const [event, setEvent] = useState({});
    const { id } = useParams();
    const [searchTerm, setSearchTerm] = useState(""); 


    useEffect(() => {

        const fetchEvent = async (id) => {
            try {
                const response = await getEvent(id);
                setEvent(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        const fetchEventParticipants = async (id) => {
            try {
                const response = await getEventParticipants(id);
                setParticipants(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchEventParticipants(id);
        fetchEvent(id);
    }, [id]);


    useEffect(() => {

        let filteredParticipants = [...participants];


        console.log(searchTerm);

    }, [searchTerm, participants]);


    return (
        <div className='container'>
            <h1>{event.title} participants:</h1>
            <input
                type="text"
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
                style={{ marginBottom: '20px', padding: '8px', width: '300px' }}
            />
            <div className='catalog-block-with-card'>
                {participants.filter((item) => {
                    const lowerCaseSearchTerm = searchTerm.toLowerCase();
                    return lowerCaseSearchTerm === ''
                        ? true 
                        : (item.full_name && item.full_name.toLowerCase().includes(lowerCaseSearchTerm)) ||
                        (item.email && item.email.toLowerCase().includes(lowerCaseSearchTerm)); 
                }).map(({ id, full_name, email }, idx) => (
                    <ParticipantItem
                        id={id}
                        fullName={full_name}
                        email={email}
                        key={idx}
                    />
                ))}
            </div>

        </div>
    )
}

export default EventParticipants;
