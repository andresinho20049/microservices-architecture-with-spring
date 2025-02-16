package com.andresinho20049.spring_graphql.service.api;

import com.andresinho20049.spring_graphql.db.entity.Employee;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface EmployeeService {
	
	Mono<Employee> findById(Long id);
	
	Flux<Employee> findByCompanyId(Long companyId);
	
	Flux<Employee> findByPositionId(Long positionId);
	
}
