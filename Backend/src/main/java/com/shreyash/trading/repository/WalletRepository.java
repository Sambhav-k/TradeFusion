package com.shreyash.trading.repository;

import com.shreyash.trading.modal.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WalletRepository extends JpaRepository<Wallet,Long> {

    Wallet findByUserId(long userId);

}
