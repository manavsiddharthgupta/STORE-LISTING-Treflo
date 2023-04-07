import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store";
import Button from "./Button";

const CustomizePizza = (props) => {
  const [size, setSize] = useState("");
  const [toppings, setToppings] = useState([]);

  const dispatch = useDispatch();

  const fetchedMenuData = useSelector(
    (state) => state.sortandfilterReducers.fetchedMenuData
  );

  const [customizePizzaData] = fetchedMenuData.filter((each) => {
    return each.id === props.showModalId;
  });

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleToppingsChange = (e) => {
    const topping = e.target.value;
    const checked = e.target.checked;
    if (customizePizzaData.toppings[0].isRadio) {
      setToppings([topping]);
    } else {
      if (checked) {
        setToppings([...toppings, topping]);
      } else {
        setToppings(toppings.filter((t) => t !== topping));
      }
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between gap-4">
        <div className="w-full">
          <img
            className="object-cover h-[320px] rounded-lg"
            src={customizePizzaData.img_url}
            alt="__img"
          />
        </div>
        <div className="min-w-[165px]">
          <h2 className="font-extrabold text-xl">{customizePizzaData.name}</h2>
          <label className="font-semibold text-lg">Select the size: </label>
          <ul>
            {customizePizzaData.size[0].items.map((item, index) => (
              <li key={index} className="flex items-center mb-1">
                <input
                  className="cursor-pointer"
                  type={
                    customizePizzaData.size[0].isRadio ? "radio" : "checkbox"
                  }
                  id={`size-${index}`}
                  name="size"
                  value={item.size}
                  checked={size === item.size}
                  onChange={handleSizeChange}
                />
                <label
                  className="ml-2 cursor-pointer"
                  htmlFor={`size-${index}`}
                >
                  {item.size}
                </label>
              </li>
            ))}
          </ul>
          <div className="mt-4"></div>
          <label className="font-semibold text-lg">Choose the toopings: </label>
          <ul>
            {customizePizzaData.toppings[0].items.map((item, index) => (
              <li className="flex items-center mb-1" key={index}>
                <input
                  className="cursor-pointer"
                  type={
                    customizePizzaData.toppings[0].isRadio
                      ? "radio"
                      : "checkbox"
                  }
                  id={`topping-${index}`}
                  name="topping"
                  value={item.name}
                  checked={toppings.includes(item.name)}
                  onChange={handleToppingsChange}
                />
                <label
                  className="ml-2 cursor-pointer"
                  htmlFor={`topping-${index}`}
                >
                  {item.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">₹{customizePizzaData.price}</h1>
        <div>
          <Button
            className="px-[15px] py-[3px] mr-2 text-[#048654] bg-white hover:text-white border-[1px] border-[#048654]"
            onClick={props.onSetHideModal}
          >
            Cancel
          </Button>
          <Button
            className="px-4 py-1"
            onClick={() => {
              if (size === "") {
                return;
              }
              const id = Math.floor(Math.random() * 100000);
              const orderData = {
                orderName: customizePizzaData.name,
                orderPrice: customizePizzaData.price,
                orderId: customizePizzaData.id,
                orderSize: size,
                orderToppings: toppings,
                orderQuantity: 1,
                id,
              };
              dispatch(cartActions.addtoCart(orderData));
              props.onSetHideModal();
            }}
          >
            Done
          </Button>
        </div>
      </div>
    </>
  );
};

export default CustomizePizza;
