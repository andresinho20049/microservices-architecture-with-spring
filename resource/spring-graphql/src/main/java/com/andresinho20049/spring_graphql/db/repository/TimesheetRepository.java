package com.andresinho20049.spring_graphql.db.repository;

import org.springframework.data.r2dbc.repository.R2dbcRepository;

import com.andresinho20049.spring_graphql.db.entity.Timesheet;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface TimesheetRepository extends R2dbcRepository<Timesheet, Long> {
	
	Mono<Timesheet> findById(Long id);
	
	Flux<Timesheet> findByCompanyId(Long companyId);
	
	Flux<Timesheet> findByEmployeeId(Long employeeId);
	
	Flux<Timesheet> findByProjectId(Long projectId);
	
	Flux<Timesheet> findByEmployeeIdAndProjectIdAndCompanyId(Long employeeId, Long projectId, Long companyId);
}
