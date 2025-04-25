package com.shreyash.trading.repository;

import com.shreyash.trading.modal.PaymentDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentDetailsRepository extends JpaRepository<PaymentDetails, Long> {

  PaymentDetails findByUserId(Long userId);
}
