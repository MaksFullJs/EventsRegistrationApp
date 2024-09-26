import axios from 'axios';

export const getEvents = async () => {
    return await axios.get('http://localhost:5050/events');
}

export const registerForEvent = async (user, eventId, source) => {
    console.log({...user, eventId, source})
    return await axios.post('http://localhost:5050/register', {...user, eventId, source});
}

export const getEventParticipants = async (id) => {
    return await axios.get(`http://localhost:5050/event/${id}/participants`);
}

export const getEvent = async (id) => {
    return await axios.get(`http://localhost:5050/event/${id}`);
}