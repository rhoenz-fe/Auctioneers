import React, { useEffect, useState } from 'react';
import { List, Avatar } from 'antd';
import BidForm from './BidForm';
import axios from 'axios';

export const ParticipantsList = ({ auctionId }) => {
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        if (auctionId) {
            getBid()
        }
    }, [auctionId]);


    const getBid = () => {
        axios.get(`http://localhost:3000/api/bid/specificAuctionByUser/${auctionId}`, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDI5MThkM2RlOThlZjNlNzNmYzIxZiIsImlhdCI6MTY5MTg3MjI2NiwiZXhwIjoxNjkxOTA4MjY2fQ.viPjMQj3awafBjGhFtlLeZg6aA21rWHT64gc472CZmw'
            }
        })
            .then(response => {
                setParticipants(response.data.bids);
            })
            .catch(error => {
                console.error('Error fetching bid data:', error);
            });
    }

    return (
        <>
            <List
                dataSource={participants}
                renderItem={participant => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar>{participant.msg.charAt(0)}</Avatar>}
                            title={`$${participant.yourBidPrice}`}
                            description={<>
                                <h6>Message: {participant.msg}</h6>
                                <p>Cover letter: {participant.coverLetter}</p>
                            </>}
                        />
                    </List.Item>
                )}
            />
            <div style={{ marginTop: '16px', display: 'flex', width: '100%' }}>
                <BidForm auctionId={auctionId} getBid={getBid} />
            </div>
        </>
    );
};
