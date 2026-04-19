package com.lms.backend.controller;

import com.lms.backend.dto.JwtResponse;
import com.lms.backend.dto.LoginRequest;
import com.lms.backend.entity.Student;
import com.lms.backend.entity.Role;
import com.lms.backend.repository.StudentRepository;
import com.lms.backend.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

// 🔥 EMAIL
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private JavaMailSender mailSender;

    // 🔥 REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Student student) {

        try {
            // 🔐 Encrypt password
            student.setPassword(passwordEncoder.encode(student.getPassword()));

            // 🔥 FIRST USER = ADMIN
            if (studentRepository.count() == 0) {
                student.setRole(Role.ADMIN);
                student.setStatus("ACTIVE");
            } else {
                student.setStatus("PENDING");
            }

            // 🔥 Default role safety
            if (student.getRole() == null) {
                student.setRole(Role.STUDENT);
            }

            studentRepository.save(student);

            return ResponseEntity.ok("Registered successfully. Wait for admin verification");

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Register error: " + e.getMessage());
        }
    }

    // 🔥 LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        try {
            Student user = studentRepository.findByEmail(request.getEmail())
                    .orElse(null);

            if (user == null) {
                return ResponseEntity.status(401).body("Invalid email or password");
            }

            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                return ResponseEntity.status(401).body("Invalid email or password");
            }

            // 🔥 STATUS CHECK
            if (!"ACTIVE".equals(user.getStatus())) {
                return ResponseEntity.status(403).body("Wait for admin approval");
            }

            String role = user.getRole().name();
            String token = jwtUtil.generateToken(user.getEmail());

            return ResponseEntity.ok(new JwtResponse(token, role));

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Login error: " + e.getMessage());
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {

        try {
            Student user = studentRepository.findByEmail(email).orElse(null);

            if (user == null) {
                return ResponseEntity.badRequest().body("Email not found");
            }

            // ✅ FIX 1: expiry check add
            if (user.getOtp() != null && user.getOtpExpiry() > System.currentTimeMillis()) {
                return ResponseEntity.badRequest().body("OTP already sent. Please wait.");
            }

            // 🔥 OTP generate
            String otp = String.valueOf((int)(Math.random() * 900000) + 100000);

            long expiryTime = System.currentTimeMillis() + (10 * 60 * 1000);

            user.setOtp(otp);
            user.setOtpExpiry(expiryTime);

            studentRepository.save(user);

            // 🔥 EMAIL
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("LMS Password Reset OTP");
            message.setText(
                    "Your OTP is: " + otp +
                    "\n\nThis OTP is valid for 10 minutes." +
                    "\n\nDo not share this with anyone." +
                    "\n\nFrom Md Zafrullah OLMS"
            );

            mailSender.send(message);

            return ResponseEntity.ok("OTP sent to your email");

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error sending OTP: " + e.getMessage());
        }
    }
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(
            @RequestParam String email,
            @RequestParam String otp,
            @RequestParam String newPassword
    ) {

        try {
            Student user = studentRepository.findByEmail(email).orElse(null);

            if (user == null) {
                return ResponseEntity.badRequest().body("User not found");
            }

            // ✅ FIX 2: correct OTP match
            if (user.getOtp() == null || !user.getOtp().equals(otp)) {
                return ResponseEntity.badRequest().body("Invalid OTP");
            }

            // ✅ expiry check
            if (user.getOtpExpiry() == null || user.getOtpExpiry() < System.currentTimeMillis()) {
                return ResponseEntity.badRequest().body("OTP expired");
            }

            // 🔐 update password
            user.setPassword(passwordEncoder.encode(newPassword));

            // 🔥 clear OTP
            user.setOtp(null);
            user.setOtpExpiry(null);

            studentRepository.save(user);

            return ResponseEntity.ok("Password updated successfully");

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Reset error: " + e.getMessage());
        }
    }
    }
    
