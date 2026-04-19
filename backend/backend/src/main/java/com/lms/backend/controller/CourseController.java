package com.lms.backend.controller;

import com.lms.backend.entity.Course;
import com.lms.backend.repository.CourseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teacher")
@CrossOrigin("*")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @PostMapping("/course")
    public ResponseEntity<?> createCourse(@RequestBody Course course) {

        try {
            course.setStatus("PENDING");
            course.setUpdated(false);

            courseRepository.save(course);

            return ResponseEntity.ok("Course created successfully");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
    @PutMapping("/course/{id}")
    public ResponseEntity<?> updateCourse(@PathVariable Long id, @RequestBody Course updatedCourse) {

        Course course = courseRepository.findById(id).orElse(null);

        if (course == null) {
            return ResponseEntity.badRequest().body("Course not found");
        }

        course.setTitle(updatedCourse.getTitle());
        course.setDescription(updatedCourse.getDescription());
        course.setCategory(updatedCourse.getCategory());
        course.setDuration(updatedCourse.getDuration());

        course.setStatus("PENDING");
        course.setUpdated(true);

        courseRepository.save(course);

        return ResponseEntity.ok("Update request sent to admin");
    }
    // 🔥 GET ALL COURSES (student side)
    @GetMapping("/courses")
    public List<Course> getCourses() {
        return courseRepository.findAll()
                .stream()
                .filter(c -> "APPROVED".equals(c.getStatus()))
                .toList();
    }
}