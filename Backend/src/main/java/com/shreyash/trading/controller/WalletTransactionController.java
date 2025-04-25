package com.shreyash.trading.controller;

import com.shreyash.trading.domain.WalletTransactionType;
import com.shreyash.trading.modal.User;
import com.shreyash.trading.modal.Wallet;
import com.shreyash.trading.modal.WalletTransaction;
import com.shreyash.trading.service.WalletService;
import com.shreyash.trading.service.WalletTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/wallet")
public class WalletTransactionController {

    @Autowired
    private WalletTransactionService walletTransactionService;

    @Autowired
    private WalletService walletService;

    /**
     * Fetch wallet transactions. If type query param is ALL or not specified, returns all transactions.
     *
     * @param user currently authenticated user (assumed usage of Spring Security)
     * @param type optional query param for filtering by WalletTransactionType; default ALL
     * @return list of wallet transactions for the user
     */
    @GetMapping("/transactions")
    public ResponseEntity<?> getWalletTransactions(
            @AuthenticationPrincipal User user,
            @RequestParam(value = "type", required = false, defaultValue = "ALL") String type
    ) {
        if (user == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        Wallet wallet = walletService.getUserWallet(user);
        WalletTransactionType transactionType;

        // Parse type query parameter safely
        try {
            transactionType = WalletTransactionType.valueOf(type.toUpperCase());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid transaction type: " + type);
        }

        List<WalletTransaction> transactions;

        if (transactionType == WalletTransactionType.ALL) {
            transactions = walletTransactionService.getTransactions(wallet, null);
        } else {
            transactions = walletTransactionService.getTransactions(wallet, transactionType);
        }

        return ResponseEntity.ok(transactions != null ? transactions : Collections.emptyList());
    }
}



