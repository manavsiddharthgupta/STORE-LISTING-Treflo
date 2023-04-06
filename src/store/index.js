import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  cart: [],
  totalCost: 0,
};

const initialSorted_FilteredData = {
  fetchedMenuData: [],
  sort: "recommend",
  filter: "all",
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addtoCart: (state, action) => {
      let totalCost = state.totalCost + +action.payload.orderPrice;
      return {
        cart: [...state.cart, action.payload],
        totalCost: totalCost,
      };
    },
    deletefromCart: (state, action) => {
      let itemExist = state.cart.findIndex((each) => {
        return each.id === action.payload;
      });

      let pizzaQuantity = state.cart[itemExist].orderQuantity;
      let pizzaAmt = +state.cart[itemExist].orderPrice;
      let newCart = [...state.cart];
      if (pizzaQuantity > 1) {
        let newPizz = { ...newCart[itemExist] };
        newPizz.orderQuantity = +pizzaQuantity - 1;
        newCart[itemExist] = newPizz;
      } else {
        const renewednewCart = state.cart.filter(
          (each) => each.id !== action.payload
        );
        newCart = [...renewednewCart];
      }
      let totalCost = state.totalCost - pizzaAmt;
      return {
        cart: newCart,
        totalCost: totalCost,
      };
    },
    repeatingCartItem: (state, action) => {
      let itemExist = state.cart.findIndex((each) => {
        return each.id === action.payload;
      });

      if (itemExist >= 0) {
        let pizzaQuantity = state.cart[itemExist].orderQuantity;
        let pizzaAmt = state.cart[itemExist].orderPrice;

        if (!isNaN(pizzaQuantity) && !isNaN(pizzaAmt)) {
          let newCart = [...state.cart];
          let newPizz = { ...newCart[itemExist] };
          newPizz.orderQuantity = +pizzaQuantity + 1;
          newCart[itemExist] = newPizz;
          let totalCost = state.totalCost + +pizzaAmt;

          return {
            cart: newCart,
            totalCost: totalCost,
          };
        }
      }
      return state;
    },
  },
});

const sortandfilterSlice = createSlice({
  name: "sort_fliter",
  initialState: initialSorted_FilteredData,
  reducers: {
    onSetFetchedData: (state, action) => {
      return {
        ...state,
        fetchedMenuData: [...action.payload],
      };
    },
    changeSortingmethod: (state, action) => {
      return {
        ...state,
        sort: action.payload,
      };
    },
    changeFilterMethod: (state, action) => {
      return {
        ...state,
        filter: action.payload,
      };
    },
  },
});

export const store = configureStore({
  reducer: {
    cartReducers: cartSlice.reducer,
    sortandfilterReducers: sortandfilterSlice.reducer,
  },
});

export const cartActions = cartSlice.actions;
export const sortandfilterActions = sortandfilterSlice.actions;
