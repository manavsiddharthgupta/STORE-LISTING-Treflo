import CustomizePizza from "./CustomizePizza";

const Modal = (props) => {
  // const handleAddToCart = () => {
  //   // Add the selected pizza with size and toppings to the cart
  //   console.log(
  //     `Added ${pizza.name} with ${size} size and ${toppings.join(
  //       ", "
  //     )} toppings to the cart.`
  //   );
  // };

  return (
    <div className="w-[450px] h-[400px] max-w-[95%] z-30 overflow-auto fixed top-2/4 left-2/4 p-4 bg-white -translate-x-1/2 -translate-y-1/2 rounded-xl">
      <CustomizePizza
        showModalId={props.showModalId}
        onSetHideModal={props.onSetHideModal}
      />
    </div>
  );
};

export default Modal;
