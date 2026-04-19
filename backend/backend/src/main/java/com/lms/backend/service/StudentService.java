package com.lms.backend.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.lms.backend.entity.Student;
import com.lms.backend.repository.StudentRepository;
import com.lms.backend.exception.ResourceNotFoundException;
import java.util.List;
@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    // SAVE
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public Student saveStudent(Student student) {
        student.setPassword(passwordEncoder.encode(student.getPassword()));
        return studentRepository.save(student);
    }

    // GET ALL
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // GET BY ID
    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
    }

    // UPDATE
    public Student updateStudent(Long id, Student updatedStudent) {

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));

        student.setFullName(updatedStudent.getFullName());
        student.setEmail(updatedStudent.getEmail());
        student.setMobileNo(updatedStudent.getMobileNo());
        student.setAddress(updatedStudent.getAddress());
        student.setCourse(updatedStudent.getCourse());
        student.setSemester(updatedStudent.getSemester());
        student.setStatus(updatedStudent.getStatus());

        return studentRepository.save(student);
    }

    // DELETE
    public void deleteStudent(Long id) {

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));

        studentRepository.delete(student);
    }
}