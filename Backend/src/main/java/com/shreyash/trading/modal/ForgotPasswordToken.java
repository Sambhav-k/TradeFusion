package com.shreyash.trading.modal;

import com.shreyash.trading.domain.VerificationType;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ForgotPasswordToken {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    @OneToOne
    private User user;

    private String otp;

    private VerificationType verificationType;

    private String sendTo;
}
