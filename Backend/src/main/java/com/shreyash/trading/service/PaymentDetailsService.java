package com.shreyash.trading.service;

import com.shreyash.trading.modal.PaymentDetails;
import com.shreyash.trading.modal.User;

public interface PaymentDetailsService {

    public PaymentDetails addPaymentDetails(String accountNumber,
                                            String accountHolderName,
                                            String ifsc,
                                            String bankName,
                                            User user);

    public PaymentDetails getUsersPaymentDetails(User user);
}
