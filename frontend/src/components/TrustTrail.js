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

import React from 'react';
import PropTypes from 'prop-types';
import TransactionCard from './TransactionCard';
import '../styles/TrustTrail.css';

function TrustTrail({ transactions }) {
    return (
        <section id="trusttrail" className="user-trusttrail">
            {transactions.map(transaction => (
                <TransactionCard
                    key={transaction.id}
                    type={transaction.type}
                    title={transaction.title}
                    sphere={transaction.sphere}
                    participants={transaction.participants}
                    description={transaction.description}
                    project={transaction.project}
                    imageUrl={transaction.imageUrl}
                    time={transaction.time}
                    status={transaction.status}
                    likesCount={transaction.likesCount}
                    likedByCurrentUser={transaction.likedByCurrentUser}
                    originService={transaction.originService}
                    initiatedTime={transaction.initiatedTime}
                    inProgressTime={transaction.inProgressTime}
                    finishedTime={transaction.finishedTime}
                    trustifactedTime={transaction.trustifactedTime}
                    additionalCommentsTime={transaction.additionalCommentsTime}
                    trustifacts={transaction.trustifacts}
                    shoutouts={transaction.shoutouts}
                    onAddTrustifact={transaction.onAddTrustifact}
                    onAddShoutout={transaction.onAddShoutout}
                    onModifyTransaction={transaction.onModifyTransaction}
                    canModify={transaction.canModify}
                />
            ))}
        </section>
    );
}

TrustTrail.propTypes = {
    transactions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        sphere: PropTypes.string.isRequired,
        participants: PropTypes.arrayOf(PropTypes.string).isRequired,
        description: PropTypes.string.isRequired,
        project: PropTypes.string,
        imageUrl: PropTypes.string,
        time: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        likesCount: PropTypes.number.isRequired,
        likedByCurrentUser: PropTypes.bool.isRequired,
        originService: PropTypes.string,
        initiatedTime: PropTypes.string,
        inProgressTime: PropTypes.string,
        finishedTime: PropTypes.string,
        trustifactedTime: PropTypes.string,
        additionalCommentsTime: PropTypes.string,
        trustifacts: PropTypes.arrayOf(PropTypes.shape({
            author: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            time: PropTypes.string.isRequired,
            likesCount: PropTypes.number.isRequired,
            likedByCurrentUser: PropTypes.bool.isRequired,
            imageUrl: PropTypes.string
        })),
        shoutouts: PropTypes.arrayOf(PropTypes.shape({
            author: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            time: PropTypes.string.isRequired,
            likesCount: PropTypes.number.isRequired,
            likedByCurrentUser: PropTypes.bool.isRequired
        })),
        onAddTrustifact: PropTypes.func.isRequired,
        onAddShoutout: PropTypes.func.isRequired,
        onModifyTransaction: PropTypes.func.isRequired,
        canModify: PropTypes.bool.isRequired
    })).isRequired
};

export default TrustTrail;
