import {legacy_createStore as createStore, applyMiddleware, compose, combineReducers} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import favoritesReducer from "./favorites";
import photoReducer from "./photoReducer";
import albumsReducer from "./albums";
import commentReducer from "./comments";


const rootReducer = combineReducers({
  session: sessionReducer,
  photo: photoReducer,
  favorites: favoritesReducer,
  albums: albumsReducer,
  comments: commentReducer,
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
