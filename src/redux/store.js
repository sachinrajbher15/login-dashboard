import { createStore } from "redux";

// Define initial state
const initialState = {
  isAuthenticated: !!localStorage.getItem("authToken"), // Check if user is authenticated
  data: [], // Array to hold the data
};

// Define actions
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const SET_DATA = "SET_DATA";
const ADD_ITEM = "ADD_ITEM";
const EDIT_ITEM = "EDIT_ITEM";
const DELETE_ITEM = "DELETE_ITEM";

// Action creators
export const login = (token) => ({
  type: LOGIN,
  payload: token,
});

export const logout = () => ({
  type: LOGOUT,
});

export const setData = (data) => ({
  type: SET_DATA,
  payload: data,
});

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

export const editItem = (id, newName, newDob) => ({
  type: EDIT_ITEM,
  payload: { id, newName, newDob },
});

export const deleteItem = (id) => ({
  type: DELETE_ITEM,
  payload: id,
});

// Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("authToken", action.payload); // Save token to localStorage
      return { ...state, isAuthenticated: true };
    case LOGOUT:
      localStorage.removeItem("authToken");
      return { ...state, isAuthenticated: false };
    case SET_DATA:
      return { ...state, data: action.payload };
    case ADD_ITEM:
      return { ...state, data: [...state.data, action.payload] };
    case EDIT_ITEM:
      return {
        ...state,
        data: state.data.map((item) =>
          item.id === action.payload.id
            ? { ...item, name: action.payload.newName, dob: action.payload.newDob }
            : item
        ),
      };
    case DELETE_ITEM:
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

// Create Redux store
const store = createStore(authReducer);

export default store;
