package com.lms.backend.controller;

import com.lms.backend.repository.CourseRepository;
import com.lms.backend.entity.Course;
import com.lms.backend.entity.Student;
import com.lms.backend.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private StudentRepository studentRepository;

    // 🔥 GET ALL USERS
    @GetMapping("/users")
    public List<Student> getAllUsers() {
        return studentRepository.findAll();
    }

    // 🔥 APPROVE USER
    @PutMapping("/approve/{id}")
    public ResponseEntity<?> approveUser(@PathVariable Long id) {

        Student user = studentRepository.findById(id).orElse(null);

        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        user.setStatus("ACTIVE");
        studentRepository.save(user);

        return ResponseEntity.ok("User Approved ✔");
    }

    // 🔥 DEACTIVATE USER
    @PutMapping("/deactivate/{id}")
    public ResponseEntity<?> deactivateUser(@PathVariable Long id) {

        Student user = studentRepository.findById(id).orElse(null);

        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        user.setStatus("INACTIVE");
        studentRepository.save(user);

        return ResponseEntity.ok("User Deactivated ✔");
    }

    // ===========================
    // 🔥 COURSE MANAGEMENT
    // ===========================

    // 🔥 GET ALL COURSES (ADMIN VIEW)
    @GetMapping("/courses")
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // 🔥 APPROVE COURSE
    @PutMapping("/approve-course/{id}")
    public ResponseEntity<?> approveCourse(@PathVariable Long id) {

        Course course = courseRepository.findById(id).orElse(null);

        if (course == null) {
            return ResponseEntity.badRequest().body("Course not found");
        }

        course.setStatus("APPROVED");
        course.setUpdated(false);

        courseRepository.save(course);

        return ResponseEntity.ok("Course approved ✔");
    }

    // 🔥 REJECT COURSE (OPTIONAL BUT IMPORTANT)
    @PutMapping("/reject-course/{id}")
    public ResponseEntity<?> rejectCourse(@PathVariable Long id) {

        Course course = courseRepository.findById(id).orElse(null);

        if (course == null) {
            return ResponseEntity.badRequest().body("Course not found");
        }

        course.setStatus("REJECTED");

        courseRepository.save(course);

        return ResponseEntity.ok("Course rejected ❌");
    }
}