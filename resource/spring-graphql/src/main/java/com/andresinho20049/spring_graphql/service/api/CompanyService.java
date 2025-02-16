package com.andresinho20049.spring_graphql.service.api;

import com.andresinho20049.spring_graphql.db.entity.Company;

import reactor.core.publisher.Mono;

public interface CompanyService {

	Mono<Company> findById(Long id);
	
	
}
