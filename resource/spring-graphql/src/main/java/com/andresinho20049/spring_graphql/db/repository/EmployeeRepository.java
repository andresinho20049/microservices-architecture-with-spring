package com.andresinho20049.spring_graphql.db.repository;

import org.springframework.data.r2dbc.repository.R2dbcRepository;

import com.andresinho20049.spring_graphql.db.entity.Employee;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface EmployeeRepository extends R2dbcRepository<Employee, Long> {
	
	Mono<Employee> findById(Long id);
	
	Flux<Employee> findByName(String name);
	
	Flux<Employee> findByCompanyId(Long companyId);
	
	Flux<Employee> findByPositionId(Long positionId);
}
