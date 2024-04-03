import React, {useState} from 'react';
import {getAuth, sendPasswordResetEmail } from 'firebase/auth';
import './ForgotPassword.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setMessage('Password reset email sent. Check your inbox.');
                setError(''); // Clear any previous errors
            })
            .catch((error) => {
                setError('Failed to send password reset email. Please try again.');
                setMessage(''); // Clear any previous messages
                console.error('Error sending password reset email:', error);
            });
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit} className="forgot-password-form">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Send Reset Email</button>
            </form>
            {message && <p className="forgot-password-message">{message}</p>}
            {error && <p className="forgot-password-message error-message">{error}</p>}
        </div>
    );
}

export default ForgotPassword;