package com.lms.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lms.backend.entity.Student;
import java.util.Optional;
public interface StudentRepository extends JpaRepository<Student, Long> {
	
	Optional<Student> findByEmail(String email);
	//Object findByEmail(String email);

}