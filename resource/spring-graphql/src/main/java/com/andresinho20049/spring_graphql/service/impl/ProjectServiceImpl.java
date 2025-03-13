package com.andresinho20049.spring_graphql.service.impl;

import java.time.LocalDate;

import org.springframework.r2dbc.core.DatabaseClient.GenericExecuteSpec;
import org.springframework.stereotype.Service;

import com.andresinho20049.spring_graphql.db.entity.Project;
import com.andresinho20049.spring_graphql.db.repository.ProjectRepository;
import com.andresinho20049.spring_graphql.service.api.ProjectService;
import com.andresinho20049.spring_graphql.util.AuthenticationUtils;
import com.andresinho20049.spring_graphql.util.DatabaseClientCustom;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class ProjectServiceImpl implements ProjectService {
	
	private ProjectRepository projectRepository;
	private DatabaseClientCustom databaseClient;
	
	public ProjectServiceImpl(ProjectRepository projectRepository, DatabaseClientCustom databaseClient) {
		this.projectRepository = projectRepository;
		this.databaseClient = databaseClient;
	}

	@Override
	public Mono<Project> findById(Long id) {
		return projectRepository.findById(id);
	}

	@Override
	public Flux<Project> findByCompanyId(Long companyId) {
		return projectRepository.findByCompanyId(companyId);
	}

	@Override
	public Mono<Project> saveProject(Long id, Project project) {
		final String sql = """
				SELECT 
					 f.id,
					 f.created_at,
					 f.updated_at,
					 f.updated_username,
					 f."name",
					 f.description,
					 f.project_start,
					 f.project_end,
					 f.company_id
				FROM insert_or_update_project(
					:p_id, 
					:p_name, 
					:p_description, 
					:p_project_start, 
					:p_project_end, 
					:p_updated_username, 
					:p_company_id) f
				""";
		
		GenericExecuteSpec genericExecuteSpec = databaseClient.sql(sql)
				.bindOptional("p_id", id, Long.class)
				.bindOptional("p_name", project.getName(), String.class)
				.bindOptional("p_description", project.getDescription(), String.class)
				.bindOptional("p_project_start", project.getProjectStart(), LocalDate.class)
				.bindOptional("p_project_end", project.getProjectEnd(), LocalDate.class)
				.bindOptional("p_updated_username", AuthenticationUtils.getUsernameByPrincipal(), String.class)
				.bindOptional("p_company_id", project.getCompanyId(), Long.class)
				.build();
		
		return genericExecuteSpec
			.mapProperties(Project.class)
			.first();
	}
	
}
