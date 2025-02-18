package com.andresinho20049.spring_graphql.service.impl;

import java.time.LocalDate;

import org.springframework.r2dbc.core.DatabaseClient.GenericExecuteSpec;
import org.springframework.stereotype.Service;

import com.andresinho20049.spring_graphql.db.entity.Timesheet;
import com.andresinho20049.spring_graphql.db.repository.TimesheetRepository;
import com.andresinho20049.spring_graphql.service.api.TimesheetService;
import com.andresinho20049.spring_graphql.util.AuthenticationUtils;
import com.andresinho20049.spring_graphql.util.DatabaseClientCustom;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class TimesheetServiceImpl implements TimesheetService {

	private TimesheetRepository timesheetRepository;
	private DatabaseClientCustom databaseClient;
	
	public TimesheetServiceImpl(TimesheetRepository timesheetRepository, DatabaseClientCustom databaseClient) {
		this.timesheetRepository = timesheetRepository;
		this.databaseClient = databaseClient;
	}
	
	@Override
	public Mono<Timesheet> findById(Long id) {
		return timesheetRepository.findById(id);
	}

	@Override
	public Flux<Timesheet> findByCompanyId(Long companyId) {
		return timesheetRepository.findByCompanyId(companyId);
	}

	@Override
	public Flux<Timesheet> findByEmployeeId(Long employeeId) {
		return timesheetRepository.findByEmployeeId(employeeId);
	}

	@Override
	public Flux<Timesheet> findByProjectId(Long projectId) {
		return timesheetRepository.findByProjectId(projectId);
	}

	@Override
	public Mono<Timesheet> saveTimesheet(Long id, Timesheet timesheet) {
		final String sql = """
				SELECT 
					 f.id,
					 f.created_at,
					 f.updated_at,
					 f.updated_username,
					 f.employee_id,
					 f.project_id,
					 f.period_start,
					 f.period_end,
					 f.company_id
				FROM insert_or_update_timesheet(
					:p_id, 
					:p_employee_id, 
					:p_project_id, 
					:p_period_start, 
					:p_period_end, 
					:p_updated_username, 
					:p_company_id) f
				""";
		
		GenericExecuteSpec genericExecuteSpec = databaseClient.sql(sql)
				.bindOptional("p_id", id, Long.class)
				.bindOptional("p_employee_id", timesheet.getEmployeeId(), Long.class)
				.bindOptional("p_project_id", timesheet.getProjectId(), Long.class)
				.bindOptional("p_period_start", timesheet.getPeriodStart(), LocalDate.class)
				.bindOptional("p_period_end", timesheet.getPeriodEnd(), LocalDate.class)
				.bindOptional("p_updated_username", AuthenticationUtils.getUsernameByPrincipal(), String.class)
				.bindOptional("p_company_id", timesheet.getCompanyId(), Long.class)
				.build();
		
		return genericExecuteSpec
			.mapProperties(Timesheet.class)
			.first();
	}

	
}
