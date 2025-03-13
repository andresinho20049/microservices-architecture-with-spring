package com.andresinho20049.spring_graphql.controller;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import com.andresinho20049.spring_graphql.db.entity.Company;
import com.andresinho20049.spring_graphql.db.entity.Project;
import com.andresinho20049.spring_graphql.db.entity.Timesheet;
import com.andresinho20049.spring_graphql.service.api.CompanyService;
import com.andresinho20049.spring_graphql.service.api.ProjectService;
import com.andresinho20049.spring_graphql.service.api.TimesheetService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Controller
public class ProjectController {

	private ProjectService projectService;
	private CompanyService companyService;
	private TimesheetService timesheetService;

	public ProjectController(ProjectService projectService, CompanyService companyService,
			TimesheetService timesheetService) {
		super();
		this.projectService = projectService;
		this.companyService = companyService;
		this.timesheetService = timesheetService;
	}

	@QueryMapping
	public Flux<Project> projectByCompanyId(@Argument Long companyId) {
		return projectService.findByCompanyId(companyId);
	}

	@SchemaMapping
	public Mono<Company> company(Project project) {
		return companyService.findById(project.getCompanyId());
	}

	@SchemaMapping
	public Flux<Timesheet> timesheets(Project project) {
		return timesheetService.findByProjectId(project.getId());
	}
	
	@MutationMapping
	public Mono<Project> createProject(@Argument Project project) {
		return projectService.saveProject(null, project);
	}
	
	@MutationMapping
	public Mono<Project> updateProject(@Argument Long id, @Argument Project project) {
		return projectService.saveProject(id, project);
	}

}
