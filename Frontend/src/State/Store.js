
import {thunk} from "redux-thunk";
import authReducer from "./Auth/Reducer.js";

import { combineReducers, legacy_createStore, applyMiddleware} from "redux";
import coinReducer from "./Coin/Reducer.js";
import walletReducer from "./Wallet/Reducer.js";
import withdrawalReducer from "./Withdrawal/Reducer.js";
import orderReducer from "./Order/Reducer.js";
import assetReducer from "./Asset/Reducer.js";
import watchlistReducer from "./WatchList/Reducer.js";

const rootReducer=combineReducers({
    auth:authReducer,
    coin:coinReducer,
    wallet:walletReducer,
    withdrawal:withdrawalReducer,
    order:orderReducer,
    asset:assetReducer,
    watchlist:watchlistReducer

});


export const store=legacy_createStore(rootReducer,applyMiddleware(thunk));