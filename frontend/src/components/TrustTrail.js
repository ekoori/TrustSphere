// File: ./frontend/src/components/TrustTrail.js:
// Description: React component file for displaying the trust trail of a user.
// Class: TrustTrail - Presents a list of all transactions of the logged-in users along with corresponding trust points.
// Properties:
//      [-] transaction_history - Contains the list of trust transactions of the logged-in user.
// Methods:
//      [-] add_transaction() - 
//      [-] get_trusttrail() - 
//      [-] componentDidMount() - Fetches user transactions from API when the component loads.
// Features:
//      [-] Users can view their history of transactions and the corresponding trust ratings received.
//      [-] Users can receive trust/gratitude entries from other users in the form of textual comments.
//      [-] Users can post trust/gratitude entries to other users' transactions.

import React, { useState, useEffect } from 'react';
import { useLogin } from '../App';
import api from '../api';

const TrustTrail = () => {
    const [transactionHistory, setTransactionHistory] = useState([]);
    const [error, setError] = useState(null);
    const { isLoggedIn, sessionId, userId } = useLogin();


    useEffect(() => {

        //const userId_test = user && user.id;
        //console.log("session ID: ", sessionId)
        console.log("user ID: ", userId)
        // TODO: Replace 'userId' with the actual logged-in user's ID.
        //const userId = 'b4dfd93d-a9e0-4bf8-8685-735dbde17ff7';

        api.post(`/api/trusttrail`,{ userId })
        .then(response => {
            try {
                setTransactionHistory(response.data);
                console.log(response.data);
                setError(null);
            } catch (error) {
                console.error('Received data is not JSON:', response.data);
                throw error;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setError(error.toString());
        });
}, [userId]);

if (error) {
    return (
        <div className='trusttrail'>
            <h1>Error loading TrustTrail</h1>
            <p>{error}</p>
        </div>
    );
}

if (!isLoggedIn) {
    return (
      <div className='trusttrail'>
        <h1>Error loading TrustTrail: User not logged in</h1>
      </div>
    );
  }

return (
        <div className='trusttrail'>
            {transactionHistory && transactionHistory.map((transaction, index) => (
    <div className="transaction" key={index} style={{border: '1px solid #ccc', margin: '10px 0', padding: '10px', boxShadow: '0 0 10px #ccc', position: 'relative'}}>
        <div style={{fontSize: '0.5em'}}>
            <p>Project: <a href={`/project/${transaction.project_id}`} style={{color: 'darkblue', textDecoration: 'none'}}> {transaction.project_name} </a> | Started: {transaction.project_start_timestamp}</p>
        </div>
        <div style={{fontSize: '0.75em', cursor: 'pointer'}} onClick={() => window.location.href=`/transaction/${transaction.transaction_id}`}>
            <p>{transaction.transaction_description}</p>
            <p>Status: {transaction.transaction_status}</p>
        </div>
        <div style={{position: 'relative'}}>
            <p style={{fontSize: '1.1em', textAlign: 'justify', textJustify: 'inter-word' }}>{transaction.gratitude_comment}</p>
            <p style={{position: 'absolute', bottom: '-15px', right: '0px'}}>1M👍 {transaction.gratitude_comment_likes}</p>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.75em', position: 'relative'}}>
            <p style={{ textAlign: 'justify', textJustify: 'inter-word' }}><a href={`/user/${transaction.other_user_id}`} style={{color: 'darkblue', textDecoration: 'none', width: '20px'}}> {transaction.other_user_name} </a>
            {transaction.other_comment}</p>
            <p style={{position: 'absolute', bottom: '-5px', right: '0px'}}>50k👍 {transaction.other_comment_likes}</p>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.75em', position: 'relative'}}>
            <p style={{ textAlign: 'justify', textJustify: 'inter-word' }}><a href={`/user/${transaction.other_comment_author_id}`} style={{color: 'darkblue', textDecoration: 'none', width: '20px'}}> {transaction.other_comment_author_name} </a>
            {transaction.user_comment}</p>
            <p style={{position: 'absolute', bottom: '-5px', right: '0px'}}>2👍 {transaction.user_comment_likes}</p>
        </div>
    </div>
))}






        </div>
    );
};

export default TrustTrail;
