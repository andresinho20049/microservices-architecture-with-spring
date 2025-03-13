package com.andresinho20049.spring_graphql.service.api;

import com.andresinho20049.spring_graphql.db.entity.Timesheet;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface TimesheetService {
	
	Mono<Timesheet> findById(Long id);
	
	Flux<Timesheet> findByCompanyId(Long companyId);
	
	Flux<Timesheet> findByEmployeeId(Long employeeId);
	
	Flux<Timesheet> findByProjectId(Long projectId);
	
	Mono<Timesheet> saveTimesheet(Long id, Timesheet timesheet);
	
}
