package com.shreyash.trading.repository;

import com.shreyash.trading.domain.WalletTransactionType;
import com.shreyash.trading.modal.Wallet;
import com.shreyash.trading.modal.WalletTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WalletTransactionRepository extends JpaRepository<WalletTransaction, Long> {

    List<WalletTransaction> findByWalletOrderByDateDesc(Wallet wallet);

    List<WalletTransaction> findByWalletAndTypeOrderByDateDesc(Wallet wallet, WalletTransactionType type);

}