package com.andresinho20049.spring_graphql.db.repository;

import org.springframework.data.r2dbc.repository.R2dbcRepository;

import com.andresinho20049.spring_graphql.db.entity.Paycheck;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface PaycheckRepository extends R2dbcRepository<Paycheck, Long> {
	
	Mono<Paycheck> findById(Long id);
	
	Flux<Paycheck> findByCompanyId(Long companyId);
	
	Flux<Paycheck> findByEmployeeId(Long employeeId);
}
