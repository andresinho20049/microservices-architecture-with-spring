package com.andresinho20049.spring_graphql.service.impl;

import org.springframework.stereotype.Service;

import com.andresinho20049.spring_graphql.db.entity.Position;
import com.andresinho20049.spring_graphql.db.repository.PositionRepository;
import com.andresinho20049.spring_graphql.service.api.PositionService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class PositionServiceImpl implements PositionService {
	
	private PositionRepository positionRepository;
	
	public PositionServiceImpl(PositionRepository positionRepository) {
		this.positionRepository = positionRepository;
	}

	@Override
	public Mono<Position> findById(Long id) {
		return positionRepository.findById(id);
	}

	@Override
	public Flux<Position> findByCompanyId(Long companyId) {
		return positionRepository.findByCompanyId(companyId);
	}

}
