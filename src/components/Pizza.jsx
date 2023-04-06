import vegImg from "../images/veg.png";
import nonvegImg from "../images/non veg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Button from "../ui/Button";

const Pizza = (props) => {
  let srcForveg = nonvegImg;
  if (props.data.isVeg) {
    srcForveg = vegImg;
  }
  return (
    <div className="w-[17rem] py-4 px-4 shadow-[0_1px_4px_rgba(0,0,0,0.16)] hover:shadow-[0px_7px_29px_0_rgba(100,100,111,0.2)] rounded-lg">
      <img
        className="h-48  rounded-lg"
        src={props.data.img_url}
        alt="_pizzaImg"
      />
      <div>
        <div className="flex justify-between mt-2 items-center">
          <h2 className="font-bold text-lg">{props.data.name}</h2>
          <img className="w-5 h-5" src={srcForveg} alt="_veg" />
        </div>
        <p className="mt-1 text-xs">{props.data.description}</p>
        <div className="mt-1 flex justify-between items-center">
          <h1 className="text-xl font-bold">₹{props.data.price}</h1>
          <div className="mt-1 rounded-lg bg-[#069c54] px-1 w-fit flex items-center gap-[2px]">
            <FontAwesomeIcon icon={faStar} size="xs" className="text-white" />
            <span className="text-white text-sm">{props.data.rating}</span>
          </div>
        </div>
        <Button
          className="w-full mt-3 text-sm py-1 font-semibold"
          onClick={() => {
            props.onSetShowModal(props.data.id);
          }}
        >
          ADD TO CART
        </Button>
      </div>
    </div>
  );
};
export default Pizza;
