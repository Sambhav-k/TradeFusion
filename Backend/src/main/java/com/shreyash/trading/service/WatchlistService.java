package com.shreyash.trading.service;

import com.shreyash.trading.modal.Coin;
import com.shreyash.trading.modal.User;
import com.shreyash.trading.modal.Watchlist;

public interface WatchlistService {

    Watchlist findUserWatchlist(Long userId) throws Exception;
    Watchlist createWatchlist(User user);
    Watchlist findById(Long id) throws Exception;

    Coin addItemToWatchlist(Coin coin, User user) throws Exception;
}
