package com.andresinho20049.spring_graphql.service.impl;

import org.springframework.stereotype.Service;

import com.andresinho20049.spring_graphql.db.entity.Timesheet;
import com.andresinho20049.spring_graphql.db.repository.TimesheetRepository;
import com.andresinho20049.spring_graphql.service.api.TimesheetService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class TimesheetServiceImpl implements TimesheetService {

	private TimesheetRepository timesheetRepository;
	
	public TimesheetServiceImpl(TimesheetRepository timesheetRepository) {
		this.timesheetRepository = timesheetRepository;
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

	
}
