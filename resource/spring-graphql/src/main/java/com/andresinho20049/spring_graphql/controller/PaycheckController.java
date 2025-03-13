package com.andresinho20049.spring_graphql.controller;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import com.andresinho20049.spring_graphql.db.entity.Company;
import com.andresinho20049.spring_graphql.db.entity.Employee;
import com.andresinho20049.spring_graphql.db.entity.Paycheck;
import com.andresinho20049.spring_graphql.service.api.CompanyService;
import com.andresinho20049.spring_graphql.service.api.EmployeeService;
import com.andresinho20049.spring_graphql.service.api.PaycheckService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Controller
public class PaycheckController {

	private PaycheckService paycheckService;
	private EmployeeService employeeService;
	private CompanyService companyService;

	public PaycheckController(PaycheckService paycheckService, EmployeeService employeeService,
			CompanyService companyService) {
		this.paycheckService = paycheckService;
		this.employeeService = employeeService;
		this.companyService = companyService;
	}

	@QueryMapping
	public Flux<Paycheck> paycheckByCompanyId(@Argument Long companyId) {
		return paycheckService.findByCompanyId(companyId);
	}
	
	@SchemaMapping
	public Mono<Employee> employee(Paycheck paycheck) {
		return employeeService.findById(paycheck.getEmployeeId());
	}
	
	@SchemaMapping
	public Mono<Company> company(Paycheck paycheck) {
		return companyService.findById(paycheck.getCompanyId());
	}
	
	@MutationMapping
	public Mono<Paycheck> createPaycheck(@Argument Paycheck paycheck) {
		return paycheckService.savePaycheck(null, paycheck);
	}
	
	@MutationMapping
	public Mono<Paycheck> updatePaycheck(@Argument Long id, @Argument Paycheck paycheck) {
		return paycheckService.savePaycheck(id, paycheck);
	}
}
