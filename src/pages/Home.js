import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";

import { BookContext } from "../context/books";

const Home = () => {
    const { featured } = useContext(BookContext);
    if (!featured.length) {
        return <h3>No Featured Houses</h3>
    }

    return (
        <>
            <Hero />
            <section className="featured">
                <header className="featured-head">
                    <h3 className="jrad">Best Offers ! 🔥🔥</h3>
                </header>
                <div className="books featured-list">
                    {featured.map(({ id, images, title, description }) => (
                        <article key={id} className="book featured-book">
                            <div className="book-image">

                                <img src={images[0]} alt={title} style={{ height: '100%', width: '100%', objectFit: 'cover', maxHeight: '200px' }} />
                                <h1>{description}</h1>

                            </div>
                            <Link to={`books/${id}`} className="btn book-link">details</Link>
                        </article>
                    ))}
                </div>
            </section>
        </>
    )
}

export default Home;