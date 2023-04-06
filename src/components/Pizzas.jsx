import { useEffect, useState } from "react";
import Pizza from "./Pizza";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector, useDispatch } from "react-redux";
import { sortandfilterActions } from "../store";

const Pizzas = (props) => {
  const [pizzasData, setPizzaData] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const sortingMethod = useSelector(
    (state) => state.sortandfilterReducers.sort
  );
  const filterMehtod = useSelector(
    (state) => state.sortandfilterReducers.filter
  );
  const fetchedMenuData = useSelector(
    (state) => state.sortandfilterReducers.fetchedMenuData
  );

  useEffect(() => {
    const fetchingDatafunc = async () => {
      try {
        const result = await fetch(
          "https://run.mocky.io/v3/ec196a02-aaf4-4c91-8f54-21e72f241b68"
        );
        const data = await result.json();
        dispatch(sortandfilterActions.onSetFetchedData(data));
        setPizzaData(() => [...data]);
      } catch (error) {
        setError("Error fetching data");
      }
    };
    fetchingDatafunc();
  }, [dispatch]);

  useEffect(() => {
    setLoadingState(true);
    let pizzaData = [...fetchedMenuData];
    if (sortingMethod === "rating") {
      pizzaData.sort((a, b) => {
        return b.rating - a.rating;
      });
    } else if (sortingMethod === "price") {
      pizzaData.sort((a, b) => {
        return a.price - b.price;
      });
    }
    let allPizzaData;
    if (filterMehtod === "veg") {
      allPizzaData = pizzaData.filter((each) => {
        return each.isVeg === true;
      });
    } else if (filterMehtod === "non-veg") {
      allPizzaData = pizzaData.filter((each) => {
        return each.isVeg !== true;
      });
    } else {
      allPizzaData = [...pizzaData];
    }
    setPizzaData(() => allPizzaData);
    setTimeout(() => {
      setLoadingState(false);
    }, 500);
  }, [fetchedMenuData, sortingMethod, filterMehtod]);

  if (error) {
    return (
      <p className="my-16 text-center text-lg font-semibold text-red-600">
        {error}
      </p>
    );
  }

  if (loadingState) {
    return <Skeleton className="mt-10" height={400} />;
  }
  return (
    <div className="flex flex-wrap gap-8 justify-center py-6">
      {pizzasData.map((each) => {
        return (
          <Pizza
            onSetShowModal={props.onSetShowModal}
            key={each.id}
            data={each}
          />
        );
      })}
    </div>
  );
};

export default Pizzas;
