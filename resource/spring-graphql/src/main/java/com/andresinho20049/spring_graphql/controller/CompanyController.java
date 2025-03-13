package com.andresinho20049.spring_graphql.controller;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import com.andresinho20049.spring_graphql.db.entity.Company;
import com.andresinho20049.spring_graphql.db.entity.Employee;
import com.andresinho20049.spring_graphql.db.entity.Position;
import com.andresinho20049.spring_graphql.db.entity.Project;
import com.andresinho20049.spring_graphql.service.api.CompanyService;
import com.andresinho20049.spring_graphql.service.api.EmployeeService;
import com.andresinho20049.spring_graphql.service.api.PositionService;
import com.andresinho20049.spring_graphql.service.api.ProjectService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Controller
public class CompanyController {

	private CompanyService companyService;
	private EmployeeService employeeService;
	private ProjectService projectService;
	private PositionService positionService;
	
	public CompanyController(
			CompanyService companyService, EmployeeService employeeService,
			ProjectService projectService, PositionService positionService) {
		this.companyService = companyService;
		this.employeeService = employeeService;
		this.projectService = projectService;
		this.positionService = positionService;
	}
	
	@QueryMapping
	public Mono<Company> companyById(@Argument Long id) {
		return companyService.findById(id);
	}

	@SchemaMapping
	public Flux<Employee> employees(Company company) {
		return employeeService.findByCompanyId(company.getId());
	}

	@SchemaMapping
	public Flux<Project> projects(Company company) {
		return projectService.findByCompanyId(company.getId());
	}
	
	@SchemaMapping
	public Flux<Position> positions(Company company) {
		return positionService.findByCompanyId(company.getId());
	}
	

}
