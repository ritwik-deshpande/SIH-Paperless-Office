import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import axios from "axios";
import api from "../utils/api";

const defaultState = {
  metadata: {}, // It should be empty during store init
  isDataInitialized: false // You can add additional property to denote, that data is not fetched for the first time
};

function rootReducer(state = defaultState, action) {
  switch (action.type) {
    case "DATA_INITIALIZED":
      return {
        ...state,
        metadata: action.metadata,
        isDataInitialized: true
      };
    default:
      return state;
  }
}

export const getInitalData = (id) => async dispatch => {
  try {
    let metadata = await axios.get(
      api.posts("users").getAll()
    );
    console.log("The id is",id)
    // You're dispatching not only the metadata, but also setting isDataInitialized to true, to denote, that data has been loaded
    dispatch({ type: "DATA_INITIALIZED", metadata, isDataInitialized: true });
  } catch (error) {
    console.log(error);
  }
};

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
