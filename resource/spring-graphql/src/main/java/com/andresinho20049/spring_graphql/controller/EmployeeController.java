package com.andresinho20049.spring_graphql.controller;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import com.andresinho20049.spring_graphql.db.entity.Company;
import com.andresinho20049.spring_graphql.db.entity.Employee;
import com.andresinho20049.spring_graphql.db.entity.Paycheck;
import com.andresinho20049.spring_graphql.db.entity.Position;
import com.andresinho20049.spring_graphql.db.entity.Timesheet;
import com.andresinho20049.spring_graphql.service.api.CompanyService;
import com.andresinho20049.spring_graphql.service.api.EmployeeService;
import com.andresinho20049.spring_graphql.service.api.PaycheckService;
import com.andresinho20049.spring_graphql.service.api.PositionService;
import com.andresinho20049.spring_graphql.service.api.TimesheetService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Controller
public class EmployeeController {

	private CompanyService companyService;
	private EmployeeService employeeService;
	private PaycheckService paycheckService;
	private TimesheetService timesheetService;
	private PositionService positionService;

	public EmployeeController(CompanyService companyService, EmployeeService employeeService,
			PaycheckService paycheckService, TimesheetService timesheetService, PositionService positionService) {
		this.companyService = companyService;
		this.employeeService = employeeService;
		this.paycheckService = paycheckService;
		this.timesheetService = timesheetService;
		this.positionService = positionService;
	}

	@QueryMapping
	public Flux<Employee> employeeByCompanyId(@Argument Long companyId) {
		return employeeService.findByCompanyId(companyId);
	}

	@SchemaMapping
	public Mono<Company> company(Employee employee) {
		return companyService.findById(employee.getCompanyId());
	}

	@SchemaMapping
	public Flux<Paycheck> paychecks(Employee employee) {
		return paycheckService.findByEmployeeId(employee.getId());
	}

	@SchemaMapping
	public Flux<Timesheet> timesheets(Employee employee) {
		return timesheetService.findByEmployeeId(employee.getId());
	}

	@SchemaMapping
	public Mono<Position> position(Employee employee) {
		return positionService.findById(employee.getPositionId());
	}
}
