package com.andresinho20049.spring_graphql.db.repository;

import org.springframework.data.r2dbc.repository.R2dbcRepository;

import com.andresinho20049.spring_graphql.db.entity.Project;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ProjectRepository extends R2dbcRepository<Project, Long> {
	
	Mono<Project> findById(Long id);
	
	Flux<Project> findByName(String name);
	
	Flux<Project> findByCompanyId(Long companyId);
}
