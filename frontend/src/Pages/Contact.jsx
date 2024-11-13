import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import '../Styling/Contact.css';

export const Contact = () => {
    const defaultFormValues = {
        fname: '',
        lname: '',
        address: '',
        email: '',
        phone: '',
        message: ''
    };

    const [form, setForm] = useState(defaultFormValues);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const resetForm = () => {
        setForm(defaultFormValues);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const templateParams = { ...form };

        emailjs.send('service_yu3xbte', 'template_0gbxxst', templateParams, 'kq-ZfpeLDvV8TYH26')
            .then(() => {
                setSubmitted(true);
                resetForm();
                setTimeout(() => setSubmitted(false), 3000);
            })
            .catch(error => console.error('Email error:', error));
    };

    return (
        <section className='contact-page page' id='contact'>
            <div className="sub-heading">
                <h1>Contact Us for a <span>Free Quote</span></h1>
                <p>Fill out the form, and we’ll be in touch soon.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="fields-group">
                    <div className="form-field">
                        <label htmlFor="fname">First Name</label>
                        <input type="text" name="fname" id="fname" value={form.fname} onChange={handleChange} required />
                    </div>
                    <div className="form-field">
                        <label htmlFor="lname">Last Name</label>
                        <input type="text" name="lname" id="lname" value={form.lname} onChange={handleChange} required />
                    </div>
                </div>
                <label htmlFor="address">Full Address</label>
                <input type="text" name="address" id="address" value={form.address} onChange={handleChange} required />

                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={form.email} onChange={handleChange} required />

                <label htmlFor="phone">Phone Number</label>
                <input type="tel" name="phone" id="phone" value={form.phone} onChange={handleChange} required />

                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" value={form.message} onChange={handleChange} rows="5" required></textarea>

                <button className='contact-btn' type="submit">
                    {submitted ? 'Message Sent!' : 'Send Message'}
                </button>
            </form>
        </section>
    );
};
