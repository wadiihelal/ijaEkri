import React, { useContext } from "react";
import { CartContext } from "../context/cart";
import { FiChevronUp } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import { useHistory } from "react-router-dom";

const Cart = () => {
  const history = useHistory();
  const { cart, total, increaseAmount, decreaseAmount } = useContext(CartContext);
  console.log(cart)
  if (!cart.length) {
    return <h3>Empty Cart</h3>
  }
  return (
    <section className="cart">
      <header>
        <h2>My Cart</h2>
      </header>
      <div className="cart-wrapper">
        {cart.map(({ id, title, price, images, amount }) => (
          <article key={id} className="cart-item">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {
                images.map((e) => {
                  return <img src={e} style={{ width: '300px', height: '300px', margin: '10px' }} />
                })
              }
            </div>
            <div className="details">
              <p>{title}</p>
            </div>

          </article>
        ))}
      </div>
      <div>
        <h3>You have to pay :{total} DT</h3>
      </div>
      <div>
        <button className="btn" onClick={() => history.push("/checkout")}>Checkout</button>
      </div>
    </section>
  );
};

export default Cart;
