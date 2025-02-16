package com.andresinho20049.spring_graphql.controller;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import com.andresinho20049.spring_graphql.db.entity.Company;
import com.andresinho20049.spring_graphql.db.entity.Employee;
import com.andresinho20049.spring_graphql.db.entity.Position;
import com.andresinho20049.spring_graphql.service.api.CompanyService;
import com.andresinho20049.spring_graphql.service.api.EmployeeService;
import com.andresinho20049.spring_graphql.service.api.PositionService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Controller
public class PositionController {

	private PositionService positionService;
	private CompanyService companyService;
	private EmployeeService employeeService;

	public PositionController(PositionService positionService, CompanyService companyService,
			EmployeeService employeeService) {
		this.positionService = positionService;
		this.companyService = companyService;
		this.employeeService = employeeService;
	}

	@QueryMapping
	public Flux<Position> positionByCompanyId(@Argument Long companyId) {
		return positionService.findByCompanyId(companyId);
	}

	@SchemaMapping
	public Mono<Company> company(Position position) {
		return companyService.findById(position.getCompanyId());
	}

	@SchemaMapping
	public Flux<Employee> employees(Position position) {
		return employeeService.findByPositionId(position.getId());
	}

}
