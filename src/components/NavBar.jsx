import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  return (
    <nav className="w-full h-16 flex justify-between lg:px-[10%] px-4 border fixed top-[0%] bg-white z-10">
      <div className="my-auto h-full flex items-center">
        <div>
          <img
            className="sm:h-20 h-16"
            src="https://img.freepik.com/premium-vector/pizza-logo-design-vector-template_260747-62.jpg?w=2000"
            alt="_logo"
          />
        </div>
        <h2 className="sm:text-3xl font-extrabold text-sm">𝔏𝔬𝔠𝔞𝔩 𝔓𝔦𝔷𝔷𝔞</h2>
      </div>
      <div className="flex">
        <NavLink
          to="/cart"
          className="rounded-lg bg-[#069C54] hover:bg-[#048654] text-white duration-300 ease-in-out h-fit px-4 py-3 my-auto text-xs"
        >
          <FontAwesomeIcon className="mr-2" icon={faShoppingCart} />
          Cart
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
