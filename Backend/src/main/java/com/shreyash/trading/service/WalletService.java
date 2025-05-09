package com.shreyash.trading.service;

import com.shreyash.trading.modal.Order;
import com.shreyash.trading.modal.User;
import com.shreyash.trading.modal.Wallet;

public interface WalletService {
    Wallet getUserWallet (User user);
    Wallet addBalance(Wallet wallet, Long money);
    Wallet findWalletById(Long id) throws Exception;
    Wallet walletToWalletTransfer(User sender,Wallet recieverWallet,Long amount) throws Exception;
    Wallet payOrderPayment(Order order, User user) throws Exception;
}
