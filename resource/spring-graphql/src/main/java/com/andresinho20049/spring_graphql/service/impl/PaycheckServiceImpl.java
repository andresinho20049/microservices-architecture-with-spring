package com.andresinho20049.spring_graphql.service.impl;

import org.springframework.stereotype.Service;

import com.andresinho20049.spring_graphql.db.entity.Paycheck;
import com.andresinho20049.spring_graphql.db.repository.PaycheckRepository;
import com.andresinho20049.spring_graphql.service.api.PaycheckService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class PaycheckServiceImpl implements PaycheckService {
	
	private PaycheckRepository paycheckRepository;
	
	public PaycheckServiceImpl(PaycheckRepository paycheckRepository) {
		this.paycheckRepository = paycheckRepository;
	}

	@Override
	public Mono<Paycheck> findById(Long id) {
		return paycheckRepository.findById(id);
	}

	@Override
	public Flux<Paycheck> findByCompanyId(Long companyId) {
		return paycheckRepository.findByCompanyId(companyId);
	}

	@Override
	public Flux<Paycheck> findByEmployeeId(Long employeeId) {
		return paycheckRepository.findByEmployeeId(employeeId);
	}

}
