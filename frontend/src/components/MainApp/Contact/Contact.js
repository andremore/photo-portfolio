import axios from 'axios';
import { useForm } from 'react-hook-form';

export const Contact = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        axios
            .post('http://localhost:8000/contact', {
                name: data.name,
                email: data.email,
                subject: data.subject,
                message: data.message,
            })
            .then(() => console.log('Delivered'));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <label htmlFor="name">Name</label>
            <input
                id="name"
                {...register('name', { required: true })}
                type="text"
                required
                placeholder="Name"
            />
            {/* Email */}
            <label htmlFor="email">Email</label>
            <input
                id="email"
                {...register('email', { required: true })}
                type="email"
                required
                placeholder="Email"
            />
            {/* Subject */}
            <label htmlFor="subject">Subject</label>
            <input
                id="subject"
                {...register('subject', { required: true })}
                required
                type="text"
                placeholder="Subject"
            />
            {/* Message */}
            <label htmlFor="message">Message</label>
            <textarea
                id="message"
                {...register('message', { required: true })}
                required
                type="text"
                placeholder="Message"
                className="textarea textarea-bordered w-full"
            />
            {/* Submit */}
            <button type="submit">Submit</button>
        </form>
    );
};
