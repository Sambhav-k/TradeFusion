package com.shreyash.trading.service;

import com.razorpay.RazorpayException;
import com.shreyash.trading.domain.PaymentMethod;
import com.shreyash.trading.modal.PaymentOrder;
import com.shreyash.trading.modal.User;
import com.shreyash.trading.response.PaymentResponse;
import com.stripe.exception.StripeException;

public interface PaymentService {

    PaymentOrder createOrder(User user,
                             Long amount,
                             PaymentMethod paymentMethod);

    PaymentOrder getPaymentOrderById(Long id) throws Exception;

    Boolean ProccedPaymentOrder(PaymentOrder paymentOrder,String paymentId) throws RazorpayException;

    PaymentResponse createRazorpayPaymentLing(User user, Long amount, Long orderId) throws RazorpayException;

    PaymentResponse createStripePaymentLing(User user, Long amount, Long orderId) throws StripeException;

}
