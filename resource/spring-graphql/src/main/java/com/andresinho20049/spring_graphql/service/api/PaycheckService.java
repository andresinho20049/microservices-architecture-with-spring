package com.andresinho20049.spring_graphql.service.api;

import com.andresinho20049.spring_graphql.db.entity.Paycheck;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface PaycheckService {
	
	Mono<Paycheck> findById(Long id);
	
	Flux<Paycheck> findByCompanyId(Long companyId);
	
	Flux<Paycheck> findByEmployeeId(Long employeeId);
	
}
