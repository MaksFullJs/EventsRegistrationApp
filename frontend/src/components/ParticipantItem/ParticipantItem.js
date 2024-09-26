
import React from 'react';
import { Card } from "antd";
import './ParticipantItem.css';

function ParticipantItem({ id, fullName, email }) {

    return (
        <Card
            hoverable
            style={{ width: 400, borderRadius: '15px', borderColor: 'blue', paddingBottom: '5px' }}>

            <div className='participant__info'>
                <h1 className='participant__name'>{fullName}</h1>
                <h3 className='participant__email'>{email}</h3>
            </div>

        </Card>
    );
}

export default ParticipantItem;