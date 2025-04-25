package com.shreyash.trading.service;

import com.shreyash.trading.modal.User;
import com.shreyash.trading.modal.Withdrawal;

import java.util.List;

public interface WithdrawalService {

    Withdrawal requestyWithdrawal(Long amount, User user);

    Withdrawal procedWithdrawal(Long withdrawalId, boolean accept) throws Exception;

    List<Withdrawal> getUsersWithdrawalHistory(User user);

    List<Withdrawal> getAllWithdrawalRequest();
}
