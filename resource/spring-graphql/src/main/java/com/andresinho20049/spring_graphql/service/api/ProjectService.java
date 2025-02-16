package com.andresinho20049.spring_graphql.service.api;

import com.andresinho20049.spring_graphql.db.entity.Project;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ProjectService {
	
	Mono<Project> findById(Long id);
	
	Flux<Project> findByCompanyId(Long companyId);
	
}
