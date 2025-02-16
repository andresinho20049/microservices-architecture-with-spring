package com.andresinho20049.spring_graphql.controller;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import com.andresinho20049.spring_graphql.db.entity.Company;
import com.andresinho20049.spring_graphql.db.entity.Employee;
import com.andresinho20049.spring_graphql.db.entity.Project;
import com.andresinho20049.spring_graphql.db.entity.Timesheet;
import com.andresinho20049.spring_graphql.service.api.CompanyService;
import com.andresinho20049.spring_graphql.service.api.EmployeeService;
import com.andresinho20049.spring_graphql.service.api.ProjectService;
import com.andresinho20049.spring_graphql.service.api.TimesheetService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Controller
public class TimesheetController {

	private TimesheetService timesheetService;
	private CompanyService companyService;
	private EmployeeService employeeService;
	private ProjectService projectService;

	public TimesheetController(TimesheetService timesheetService, CompanyService companyService,
			EmployeeService employeeService, ProjectService projectService) {
		super();
		this.timesheetService = timesheetService;
		this.companyService = companyService;
		this.employeeService = employeeService;
		this.projectService = projectService;
	}

	@QueryMapping
	public Flux<Timesheet> timesheetByCompanyId(@Argument Long companyId) {
		return timesheetService.findByCompanyId(companyId);
	}

	@SchemaMapping
	public Mono<Company> company(Timesheet timesheet) {
		return companyService.findById(timesheet.getCompanyId());
	}

	@SchemaMapping
	public Mono<Employee> employee(Timesheet timesheet) {
		return employeeService.findById(timesheet.getEmployeeId());
	}

	@SchemaMapping
	public Mono<Project> project(Timesheet timesheet) {
		return projectService.findById(timesheet.getProjectId());
	}

}
