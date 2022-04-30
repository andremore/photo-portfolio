import { useForm } from 'react-hook-form';

export const Contact = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <label htmlFor="name">Name</label>
            <input
                {...register('Name', { required: true })}
                type="text"
                required
                placeholder="Name"
                id="name"
            />
            {/* Email */}
            <label htmlFor="email">Email</label>
            <input
                {...register('Email', { required: true })}
                type="email"
                required
                placeholder="Email"
                id="email"
            />
            {/* Subject */}
            <label htmlFor="subject">Subject</label>
            <input
                {...register('Subject', { required: true })}
                required
                type="text"
                placeholder="Subject"
                id="subject"
            />
            {/* Message */}
            <label htmlFor="message">Message</label>
            <textarea
                {...register('Message', { required: true })}
                required
                type="text"
                placeholder="Message"
                id="message"
                className="textarea textarea-bordered w-full"
            />
            {/* Submit */}
            <button type="submit">Submit</button>
        </form>
    );
};
