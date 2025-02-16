package com.andresinho20049.spring_graphql.service.impl;

import org.springframework.stereotype.Service;

import com.andresinho20049.spring_graphql.db.entity.Project;
import com.andresinho20049.spring_graphql.db.repository.ProjectRepository;
import com.andresinho20049.spring_graphql.service.api.ProjectService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class ProjectServiceImpl implements ProjectService {
	
	private ProjectRepository projectRepository;
	
	public ProjectServiceImpl(ProjectRepository projectRepository) {
		this.projectRepository = projectRepository;
	}

	@Override
	public Mono<Project> findById(Long id) {
		return projectRepository.findById(id);
	}

	@Override
	public Flux<Project> findByCompanyId(Long companyId) {
		return projectRepository.findByCompanyId(companyId);
	}
	
	
	
}
