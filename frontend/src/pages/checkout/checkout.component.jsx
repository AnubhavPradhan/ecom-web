import React from "react";
import "./checkout.styles.scss";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { connect } from "react-redux";
import { selectCartTotal } from "../../redux/cart/cart.selectors";

// Currency formatter for clean totals
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const CheckoutPage = ({ cartItems, total }) => (
  <div className="checkout-page">
    <div className="checkout-header">
      <div className="header-block">
        <span>Product</span>
      </div>

      <div className="header-block">
        <span>Description</span>
      </div>

      <div className="header-block">
        <span>Quantity</span>
      </div>

      <div className="header-block">
        <span>Price</span>
      </div>

      <div className="header-block">
        <span>Remove</span>
      </div>
    </div>

    {cartItems &&
      cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem._id} cartItem={cartItem} />
      ))}

    <div className="total">
      <span>TOTAL : {currency.format(total)}</span>
    </div>

    {/* <StripeCheckoutButton price={total} /> */}
  </div>
);

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  total: selectCartTotal(state.cart.cartItems),
});

export default connect(mapStateToProps)(CheckoutPage);
