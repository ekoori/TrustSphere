import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ShoutoutForm = ({ onSave }) => {
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ text, image });
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(URL.createObjectURL(file));
        }
    };

    return (
        <div id="shoutout-entry">
            <textarea id="shoutout-text" placeholder="Write your shoutout here..." value={text} onChange={(e) => setText(e.target.value)}></textarea>
            <input type="file" id="shoutout-image" onChange={handleImageChange} />
            <button className="btn-purple" id="save-shoutout-btn" onClick={handleSubmit}>Save</button>
        </div>
    );
};

ShoutoutForm.propTypes = {
    onSave: PropTypes.func.isRequired,
};

export default ShoutoutForm;
