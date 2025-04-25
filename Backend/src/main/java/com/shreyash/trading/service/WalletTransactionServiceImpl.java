package com.shreyash.trading.service;

import com.shreyash.trading.domain.WalletTransactionType;
import com.shreyash.trading.modal.Wallet;
import com.shreyash.trading.modal.WalletTransaction;
import com.shreyash.trading.repository.WalletTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class WalletTransactionServiceImpl implements WalletTransactionService{

    @Autowired
    private WalletTransactionRepository walletTransactionRepository;


    @Override
    public WalletTransaction createTransaction(Wallet wallet,
                                               WalletTransactionType type,
                                               String transferId,
                                               String purpose,
                                               Long amount
    ) {
        WalletTransaction transaction = new WalletTransaction();
        transaction.setWallet(wallet);
        transaction.setDate(LocalDate.now());
        transaction.setType(type);
        transaction.setTransferId(transferId);
        transaction.setPurpose(purpose);
        transaction.setAmount(amount);

        return walletTransactionRepository.save(transaction);
    }

    @Override
    public List<WalletTransaction> getTransactions(Wallet wallet, WalletTransactionType type) {
        if (type == null || type == WalletTransactionType.ALL) {
            // Modify repository method call to fetch all transactions by wallet without type filtering
            return walletTransactionRepository.findByWalletOrderByDateDesc(wallet);
        } else {
            // You need to add a method in the repository to fetch by wallet AND type
            return walletTransactionRepository.findByWalletAndTypeOrderByDateDesc(wallet, type);
        }
    }}

