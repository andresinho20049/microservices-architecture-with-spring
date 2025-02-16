package com.andresinho20049.spring_graphql.service.impl;

import org.springframework.stereotype.Service;

import com.andresinho20049.spring_graphql.db.entity.Employee;
import com.andresinho20049.spring_graphql.db.repository.EmployeeRepository;
import com.andresinho20049.spring_graphql.service.api.EmployeeService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class EmployeeServiceImpl implements EmployeeService {
	
	private EmployeeRepository employeeRepository;
	
	public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
		this.employeeRepository = employeeRepository;
	}

	@Override
	public Mono<Employee> findById(Long id) {
		return employeeRepository.findById(id);
	}

	@Override
	public Flux<Employee> findByCompanyId(Long companyId) {
		return employeeRepository.findByCompanyId(companyId);
	}

	@Override
	public Flux<Employee> findByPositionId(Long positionId) {
		return employeeRepository.findByPositionId(positionId);
	}

	
}
