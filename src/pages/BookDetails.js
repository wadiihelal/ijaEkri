import React, { useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { BookContext } from "../context/books";
import { CartContext } from "../context/cart";

import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

const BookDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const { books } = useContext(BookContext);
  const { addToCart } = useContext(CartContext);

  const book = books.find((book) => {
    return book.id === id;
  });
  if (!book) {
    return <h3>Loading...</h3>;
  }


  const { images, title, description, author, price } = book;
  let l = []
  images.forEach(element => {
    l.push({ source: element })

  });

  return (
    <section className="book-details">

      <div className="detail-image">


        {/* <AwesomeSlider style={{ height: '550px', width: '550px' }}

          play={true}
          cancelOnInteraction={false}
          interval={500}


        > */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {
            images.map((e) => {
              return <img src={e} style={{ width: '300px', height: '300px', margin: '10px' }} />
            })
          }
        </div>

        {/* </AwesomeSlider> */}
      </div>
      <div className="detail-description">
        <h2>{title}</h2>
        <p>{description}</p>
        <h3>{author}</h3>
        <h4>Price : {price} - DT</h4>
        <div className="yass">
          <button
            className="btn"
            onClick={() => {
              addToCart({ ...book, id });
              history.push("/cart");
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
