package com.andresinho20049.spring_graphql.service.impl;

import java.time.LocalDate;

import org.springframework.r2dbc.core.DatabaseClient.GenericExecuteSpec;
import org.springframework.stereotype.Service;

import com.andresinho20049.spring_graphql.db.entity.Employee;
import com.andresinho20049.spring_graphql.db.repository.EmployeeRepository;
import com.andresinho20049.spring_graphql.service.api.EmployeeService;
import com.andresinho20049.spring_graphql.util.AuthenticationUtils;
import com.andresinho20049.spring_graphql.util.DatabaseClientCustom;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class EmployeeServiceImpl implements EmployeeService {
	
	private DatabaseClientCustom databaseClient;
	private EmployeeRepository employeeRepository;
	
	public EmployeeServiceImpl(DatabaseClientCustom databaseClient, EmployeeRepository employeeRepository) {
		super();
		this.databaseClient = databaseClient;
		this.employeeRepository = employeeRepository;
	}

	@Override
	public Mono<Employee> findById(Long id) {
		return employeeRepository.findById(id);
	}

	@Override
	public Flux<Employee> findByCompanyId(Long companyId) {
		return employeeRepository.findByCompanyId(companyId);
	}

	@Override
	public Flux<Employee> findByPositionId(Long positionId) {
		return employeeRepository.findByPositionId(positionId);
	}

	@Override
	public Mono<Employee> saveEmployee(Long id, Employee employee) {
		final String sql = """
				SELECT 
				    f.id,
				    f.created_at,
				    f.updated_at,
				    f.updated_username,
				    f."name",
				    f.birth_date,
				    f.hire_date,
				    f.termination_date,
				    f.position_id,
				    f.note,
				    f.company_id
				FROM insert_or_update_employee(
					:p_id, 
					:p_name, 
					:p_birth_date, 
					:p_hire_date, 
					:p_termination_date, 
					:p_position_id, 
					:p_note, 
					:p_updated_username, 
					:p_company_id) f
				""";
		
		GenericExecuteSpec genericExecuteSpec = databaseClient.sql(sql)
				.bindOptional("p_id", id, Long.class)
				.bindOptional("p_name", employee.getName(), String.class)
				.bindOptional("p_birth_date", employee.getBirthDate(), LocalDate.class)
				.bindOptional("p_hire_date", employee.getHireDate(), LocalDate.class)
				.bindOptional("p_termination_date", employee.getTerminationDate(), LocalDate.class)
				.bindOptional("p_position_id", employee.getPositionId(), Long.class)
				.bindOptional("p_note", employee.getNote(), String.class)
				.bindOptional("p_updated_username", AuthenticationUtils.getUsernameByPrincipal(), String.class)
				.bindOptional("p_company_id", employee.getCompanyId(), Long.class)
				.build();
		
		return genericExecuteSpec
			.mapProperties(Employee.class)
			.first();
	}
	
	

	
}
