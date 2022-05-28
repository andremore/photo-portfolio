import './styles/Home.css';

export const Home = () => {
    return (
        <>
            <section className="hero min-h-screen min-w-full">
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                        <p className="mb-5">
                            Provident cupiditate voluptatem et in. Quaerat
                            fugiat ut assumenda excepturi exercitationem quasi.
                            In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </section>
            <div className="flex w-full">
                <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
                    content
                </div>
                <div className="divider divider-horizontal">OR</div>
                <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
                    content
                </div>
            </div>
        </>
    );
};
