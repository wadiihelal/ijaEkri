import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { BookContext } from '../context/books';


const Books = () => {
    const { books } = useContext(BookContext);

    if (!books.length) {
        return <h3>No Houses Available</h3>
    }

    return (
        <section className="books">
            {books.map(({ images, id, title }) => (
                <article key={id} className="book">
                    <div className="book-image">
                        <img src={images[0]} alt={title} style={{ height: '100%', width: '100%', objectFit: 'cover', maxHeight: '200px' }} />
                    </div>
                    <Link to={`books/${id}`} className="btn book-link">details</Link>
                </article>
            ))}
        </section>
    )
}

export default Books
