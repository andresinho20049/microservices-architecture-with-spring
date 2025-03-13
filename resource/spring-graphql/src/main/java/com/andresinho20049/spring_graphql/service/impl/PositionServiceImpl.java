package com.andresinho20049.spring_graphql.service.impl;

import org.springframework.r2dbc.core.DatabaseClient.GenericExecuteSpec;
import org.springframework.stereotype.Service;

import com.andresinho20049.spring_graphql.db.entity.Position;
import com.andresinho20049.spring_graphql.db.repository.PositionRepository;
import com.andresinho20049.spring_graphql.service.api.PositionService;
import com.andresinho20049.spring_graphql.util.AuthenticationUtils;
import com.andresinho20049.spring_graphql.util.DatabaseClientCustom;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class PositionServiceImpl implements PositionService {
	
	private PositionRepository positionRepository;
	private DatabaseClientCustom databaseClient;
	
	public PositionServiceImpl(PositionRepository positionRepository, DatabaseClientCustom databaseClient) {
		this.positionRepository = positionRepository;
		this.databaseClient = databaseClient;
	}

	@Override
	public Mono<Position> findById(Long id) {
		return positionRepository.findById(id);
	}

	@Override
	public Flux<Position> findByCompanyId(Long companyId) {
		return positionRepository.findByCompanyId(companyId);
	}

	@Override
	public Mono<Position> savePosition(Long id, Position position) {
			final String sql = """
					SELECT 
						 f.id,
						 f.created_at,
						 f.updated_at,
						 f.updated_username,
						 f.name,
						 f.company_id
					FROM insert_or_update_position(:p_id, :p_name, :p_updated_username, :p_company_id) f
					""";
			
			GenericExecuteSpec genericExecuteSpec = databaseClient.sql(sql)
					.bindOptional("p_id", id, Long.class)
					.bindOptional("p_name", position.getName(), String.class)
					.bindOptional("p_updated_username", AuthenticationUtils.getUsernameByPrincipal(), String.class)
					.bindOptional("p_company_id", position.getCompanyId(), Long.class)
					.build();
			
			return genericExecuteSpec
				.mapProperties(Position.class)
				.first();
	}

}
