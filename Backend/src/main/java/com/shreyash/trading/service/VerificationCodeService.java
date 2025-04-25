package com.shreyash.trading.service;

import com.shreyash.trading.domain.VerificationType;
import com.shreyash.trading.modal.User;
import com.shreyash.trading.modal.VerificationCode;

public interface VerificationCodeService {
    VerificationCode sendVerificationCode(User user, VerificationType verificationType);

    VerificationCode getVerificationCodeById(Long id) throws Exception;

    VerificationCode getVerificationCodeByUser(Long userid);


    void deleteVerificationCodeById(VerificationCode verificationCode);

}
