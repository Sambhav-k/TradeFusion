package com.shreyash.trading.service;

import com.shreyash.trading.domain.VerificationType;
import com.shreyash.trading.modal.User;

public interface UserService {

public User findUserProfileByJwt(String jwt) throws Exception;
public User findUserByEmail(String email) throws Exception;
public User findUserById(Long userid) throws Exception;

public User enableTwoFactorAuthentication(
        VerificationType verificationType,
        String sendTo,
        User user);

User updatePassword(User user, String newPassword);

}
