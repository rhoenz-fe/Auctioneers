import React, { useState } from 'react';
import { Input, Button, Form, Row, Col } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';

const BidForm = ({ auctionId, getBid }) => {
    const [bidAmount, setBidAmount] = useState('');
    const [message, setMessage] = useState('');
    const [coverLetter, setCoverLetter] = useState('');

    const handleBidAmountChange = (event) => {
        setBidAmount(event.target.value);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleCoverLetterChange = (event) => {
        setCoverLetter(event.target.value);
    };

    const handlePlaceBid = () => {
        if (bidAmount !== '') {
            const bidData = {
                auction_id: auctionId,
                yourBidPrice: parseFloat(bidAmount),
                msg: message,
                coverLetter: coverLetter,
            };

            axios.post(`http://localhost:3000/api/bid/create/${auctionId}`, bidData, {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDI5MThkM2RlOThlZjNlNzNmYzIxZiIsImlhdCI6MTY5MTg3MjI2NiwiZXhwIjoxNjkxOTA4MjY2fQ.viPjMQj3awafBjGhFtlLeZg6aA21rWHT64gc472CZmw'}
            })
                .then(response => {
                    console.log('Bid placed successfully:', response.data);
                    toast.success("Your bid is added successfully!")
                    setBidAmount("")
                    setCoverLetter("")
                    setMessage("")
                    getBid()
                })
                .catch(error => {
                    toast.warn(error?.response?.data?.message)
                    console.error('Error placing bid:', error);
                });
        }
    };



    return (
        <><Form style={{ width: "100%" }}>
            <Row>
                <Col md={11}>
                    <Form.Item>
                        <Input
                            className='mr-2'
                            placeholder="Enter your bid amount"
                            type="number"
                            value={bidAmount}
                            onChange={handleBidAmountChange}
                        />
                    </Form.Item>
                </Col>
                <Col md={2}></Col>
                <Col md={11}>
                    <Form.Item>
                        <Input
                            className='mr-2'
                            placeholder="Enter a message"
                            type="text"
                            value={message}
                            onChange={handleMessageChange}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Input
                    className='mr-2'
                    placeholder="Enter a cover letter"
                    type="text"
                    value={coverLetter}
                    onChange={handleCoverLetterChange}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" onClick={handlePlaceBid}>Place Bid</Button>
            </Form.Item>
        </Form>
        </>

    );
};

export default BidForm;
