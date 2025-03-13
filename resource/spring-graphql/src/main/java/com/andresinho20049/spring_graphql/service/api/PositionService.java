package com.andresinho20049.spring_graphql.service.api;

import com.andresinho20049.spring_graphql.db.entity.Position;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface PositionService {
	
	Mono<Position> findById(Long id);
	
	Flux<Position> findByCompanyId(Long companyId);
	
	Mono<Position> savePosition(Long id, Position position);
	
}
