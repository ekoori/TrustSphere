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
    const { isLoggedIn, userId } = useLogin();

    useEffect(() => {
        if (!userId) return; // Ensure user ID is available
        // Using GET request and proper error handling
        api.get(`/api/trusttrail`, { withCredentials: true }) // Ensure credentials are sent
            .then(response => {
                setTransactionHistory(response.data || []);
                setError(null);
            })
        .catch(error => {
            const errorMsg = error.response?.status === 404
                ? 'Transaction history not found'
                : 'Error fetching transaction history';
            setError(errorMsg);
        });
    }, [userId]);

    if (!isLoggedIn) {
        return <div className='trusttrail'><h1>Error loading TrustTrail: User not logged in</h1></div>;
    }

    return (
        <div className='trusttrail'>
            {error ? <p>{error}</p> : transactionHistory.map((transaction, index) => (
                <div className="transaction" key={index}>
                    {/* Transaction rendering logic */}
                </div>
            ))}
        </div>
    );
};

export default TrustTrail;
