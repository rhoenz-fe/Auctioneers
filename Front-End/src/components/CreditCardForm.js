import React, { useState } from 'react';
import axios from 'axios';

const CreditCardForm = ({ username }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [linked, setLinked] = useState(false);

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleNameOnCardChange = (event) => {
    setNameOnCard(event.target.value);
  };

  const handleExpiryDateChange = (event) => {
    setExpiryDate(event.target.value);
  };

  const handleCVVChange = (event) => {
    setCVV(event.target.value);
  };

  const handleLinkCard = async () => {
    try {
      const response = await axios.post('/api/link-credit-card', {
        username,
        cardNumber,
        nameOnCard,
        expiryDate,
        cvv,
      });
      if (response.data.message === 'Credit card linked successfully') {
        setLinked(true);
      }
    } catch (error) {
      console.error('Error linking credit card:', error);
    }
  };

  return (
    <div>
      <h2>Link Credit Card</h2>
      {linked ? (
        <p>Credit card linked successfully!</p>
      ) : (
        <div>
          <label>
            Card Number:
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
            />
          </label>
          <label>
            Name on Card:
            <input
              type="text"
              value={nameOnCard}
              onChange={handleNameOnCardChange}
            />
          </label>
          <label>
            Expiry Date:
            <input
              type="text"
              value={expiryDate}
              onChange={handleExpiryDateChange}
            />
          </label>
          <label>
            CVV Number:
            <input type="text" value={cvv} onChange={handleCVVChange} />
          </label>
          <button onClick={handleLinkCard}>Link Credit Card</button>
        </div>
      )}
    </div>
  );
};

export default CreditCardForm;