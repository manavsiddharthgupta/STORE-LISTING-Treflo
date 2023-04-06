import Footer from "./Footer";
import NavBar from "./NavBar";
import Button from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { cartActions } from "../store";

const Cart = () => {
  const cartDetails = useSelector((state) => state.cartReducers.cart);
  const totalAmt = useSelector((state) => state.cartReducers.totalCost);

  const dispatch = useDispatch();

  let cartData = (
    <div className="p-4">
      {cartDetails.map((each) => {
        return (
          <div
            key={each.id}
            className="flex justify-between items-center py-5 border-b-[1px] border-black"
          >
            <div className="mr-2">
              <p>{each.orderName}</p>
              <div className="">
                <p className="mr-8 text-sm font-semibold">{each.orderSize}</p>
                <p className="text-xs">
                  {each.orderToppings.map((e, index) => {
                    if (index === each.orderToppings.length - 1) {
                      return e;
                    }
                    return `${e}, `;
                  })}
                </p>
              </div>
              <p className="text-xs font-semibold text-[#069C54]">
                ₹ {each.orderPrice} / Person
              </p>
            </div>
            <div className="flex items-center">
              <Button
                onClick={() => {
                  dispatch(cartActions.deletefromCart(each.id));
                }}
                className="px-2 rounded-md py-[2px]"
              >
                -
              </Button>
              <p className="mx-2 w-4 text-center">{each.orderQuantity}</p>
              <Button
                onClick={() => {
                  dispatch(cartActions.repeatingCartItem(each.id));
                }}
                className="px-2 rounded-md py-[2px]"
              >
                +
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );

  if (cartDetails.length < 1) {
    cartData = (
      <div className="text-center">
        <FontAwesomeIcon
          className="text-red-500 my-4"
          icon={faShoppingCart}
          size="3x"
        />
        <p className="font-semibold">Your cart is empty!</p>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="mt-8 pt-20 lg:px-[10%] px-4 py-12">
        <NavLink
          className="py-1 px-2 border-2 border-b-slate-200 font-semibold"
          to="/"
        >
          Back to Home
        </NavLink>
      </div>
      <div className="pt-8 lg:px-[10%] px-4 py-12">
        {cartData}
        <div className="text-right">
          <div className="my-4 flex justify-between px-4 items-center">
            <p className="text-2xl font-bold">Total Amount :</p>
            <p className="text-xl font-bold text-[#069C54]">₹ {totalAmt}</p>
          </div>
          <div>
            <Button
              onClick={() => {
                console.log("order Placed..");
              }}
              className="px-4 py-2 tracking-wide ml-4"
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
