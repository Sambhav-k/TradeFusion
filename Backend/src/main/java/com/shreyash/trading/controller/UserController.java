package com.shreyash.trading.controller;

import com.shreyash.trading.request.ForgotPasswordTokenRequest;
import com.shreyash.trading.domain.VerificationType;
import com.shreyash.trading.modal.ForgotPasswordToken;
import com.shreyash.trading.modal.User;
import com.shreyash.trading.modal.VerificationCode;
import com.shreyash.trading.request.ResetPasswordRequest;
import com.shreyash.trading.response.ApiResponse;
import com.shreyash.trading.response.AuthResponse;
import com.shreyash.trading.service.EmailService;
import com.shreyash.trading.service.ForgotPasswordService;
import com.shreyash.trading.service.UserService;
import com.shreyash.trading.service.VerificationCodeService;
import com.shreyash.trading.utils.OtpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private VerificationCodeService verificationCodeService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private ForgotPasswordService forgotPasswordService;
    private String jwt;

    @GetMapping("/api/users/profile")
    public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String jwt) throws Exception {
        User user=userService.findUserProfileByJwt(jwt);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @PatchMapping("/api/users/verification/{verificationType}/send-otp")
    public ResponseEntity<String> sendVerificationOtp(
            @RequestHeader("Authorization") String jwt,
            @PathVariable VerificationType verificationType) throws Exception {

        User user=userService.findUserProfileByJwt(jwt);

        VerificationCode verificationCode=verificationCodeService.
                getVerificationCodeByUser(user.getId());

        if(verificationCode==null) {
            verificationCode=verificationCodeService
                    .sendVerificationCode(user,verificationType);
        }
        if(verificationType.equals(VerificationType.EMAIL)) {
            emailService.sendVerificationOtpEmail(user.getEmail(), verificationCode.getOtp());
        }


        return new ResponseEntity<String>("verification otp sent successfully", HttpStatus.OK);
    }

    @PostMapping("/api/users/enable-two-factor/verify-otp/{otp}")
    public ResponseEntity<User> enableTwoFactorAuthentication(
            @PathVariable String otp,
            @RequestHeader("Authorization") String jwt) throws Exception {
        User user=userService.findUserProfileByJwt(jwt);

        VerificationCode verificationCode=verificationCodeService.getVerificationCodeByUser(user.getId());

        String sendTo=verificationCode.getVerificationType().equals(VerificationType.EMAIL)?
                verificationCode.getEmail():verificationCode.getMobile();

        boolean isVerified=verificationCode.getOtp().equals(otp);

        if(isVerified) {
            User updatedUser=userService.enableTwoFactorAuthentication(
                    verificationCode.getVerificationType(),sendTo,user);

            verificationCodeService.deleteVerificationCodeById(verificationCode);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        }
        throw new Exception("Wrong otp");
    }

    @PatchMapping("/auth/users/reset-password/send-otp")
    public ResponseEntity<AuthResponse> sendForgotPasswordOtp(

            @RequestBody ForgotPasswordTokenRequest req) throws Exception {

        User user=userService.findUserByEmail(req.getSendTo());
        String otp= OtpUtils.generateOtp();
        UUID uuid=UUID.randomUUID();
        String id=uuid.toString();

        ForgotPasswordToken token=forgotPasswordService.findByUser(user.getId());
        if(token==null) {
            token=forgotPasswordService.createToken(user,id,otp, req.getVerificationType(),req.getSendTo());
        }

        if(req.getVerificationType().equals(VerificationType.EMAIL)) {
            emailService.sendVerificationOtpEmail(
                    user.getEmail(),
                    token.getOtp());
        }
        AuthResponse response=new AuthResponse();
        response.setSession(token.getId());
        response.setMessage("Password reset otp sent successfully");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/auth/users/reset-password/verify-otp")
    public ResponseEntity<ApiResponse> resetPassword(
            @RequestParam String id,
            @RequestBody ResetPasswordRequest req,
            @RequestHeader("Authorization") String jwt) throws Exception {

        ForgotPasswordToken forgotPasswordToken = forgotPasswordService.findById(id);

        boolean isVerified = forgotPasswordToken.getOtp().equals(req.getOtp());

        if (isVerified) {
            userService.updatePassword(forgotPasswordToken.getUser(), req.getPassword());
            ApiResponse res = new ApiResponse();
            res.setMessage("Password update successfully");
            return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
        }
        throw new Exception("Wrong otp");
    }




}
