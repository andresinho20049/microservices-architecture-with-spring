package com.andresinho20049.spring_graphql.db.repository;

import org.springframework.data.r2dbc.repository.R2dbcRepository;

import com.andresinho20049.spring_graphql.db.entity.Company;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface CompanyRepository extends R2dbcRepository<Company, Long> {
	
	Mono<Company> findById(Long id);
	
	Flux<Company> findByName(String name);
}
