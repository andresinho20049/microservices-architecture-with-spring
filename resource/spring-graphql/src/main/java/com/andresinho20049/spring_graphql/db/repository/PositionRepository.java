package com.andresinho20049.spring_graphql.db.repository;

import org.springframework.data.r2dbc.repository.R2dbcRepository;

import com.andresinho20049.spring_graphql.db.entity.Position;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface PositionRepository extends R2dbcRepository<Position, Long> {
	
	Mono<Position> findById(Long id);
	
	Flux<Position> findByCompanyId(Long companyId);
	
	Mono<Position> findByNameAndCompanyId(String name, Long companyId);
}
