import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewShoutoutForm = ({ onSave, onCancel }) => {
    const [text, setText] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() === '') {
            setError(true);
        } else {
            onSave({ text });
        }
    };

    const handleTextChange = (e) => {
        setText(e.target.innerText);
        if (error && e.target.innerText.trim() !== '') {
            setError(false);
        }
    };

    return (
        <div id="shoutout-entry" style={{ backgroundColor: '#d9d9f2', padding: '1em', borderRadius: '8px', marginBottom: '1em', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <p
                id="shoutout-text"
                contentEditable
                placeholder="Write your shoutout here..."
                style={{ width: '100%', marginBottom: '0.5em', border: error ? '1px solid red' : '1px solid #ccc', padding: '0.5em', borderRadius: '4px' }}
                onInput={handleTextChange}
            >{text}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button className="btn-purple" id="save-shoutout-btn" onClick={handleSubmit} style={{ width: '49%' }}>Save</button>
                <button className="btn-purple" id="cancel-shoutout-btn" onClick={onCancel} style={{ width: '49%' }}>Cancel</button>
            </div>
        </div>
    );
};

NewShoutoutForm.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default NewShoutoutForm;
