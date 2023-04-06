import { sortandfilterActions } from "../store";
import Select from "../ui/Select";
import Pizzas from "./Pizzas";
import { useDispatch, useSelector } from "react-redux";

const Menu = (props) => {
  const dispatch = useDispatch();
  const sortingMethod = useSelector(
    (state) => state.sortandfilterReducers.sort
  );
  const filterMehtod = useSelector(
    (state) => state.sortandfilterReducers.filter
  );
  const sortingOption = {
    name: "sort",
    id: "pizzas",
    option: [
      {
        title: "Sort by Recommended",
        value: "recommend",
      },
      {
        title: "Sort by Rating",
        value: "rating",
      },
      {
        title: "Sort by Price",
        value: "price",
      },
    ],
  };
  const filterOption = {
    name: "filter",
    id: "pizzas",
    option: [
      {
        title: "All Pizzas",
        value: "all",
      },
      {
        title: "Veg Only",
        value: "veg",
      },
      {
        title: "Non-Veg",
        value: "non-veg",
      },
    ],
  };

  const onChangeSortMethodHandler = (e) => {
    dispatch(sortandfilterActions.changeSortingmethod(e.target.value));
  };

  const onChangeFilterMethodHandler = (e) => {
    dispatch(sortandfilterActions.changeFilterMethod(e.target.value));
  };

  return (
    <main className="pt-20 lg:px-[10%] px-4">
      <h1 className="font-bold text-[1.75rem] ">Menu Category</h1>
      <div className="mt-4 flex justify-between">
        <Select
          value={sortingMethod}
          onChange={onChangeSortMethodHandler}
          optionData={sortingOption}
        />
        <Select
          value={filterMehtod}
          onChange={onChangeFilterMethodHandler}
          optionData={filterOption}
        />
      </div>
      <Pizzas onSetShowModal={props.onSetShowModal} />
    </main>
  );
};
export default Menu;
