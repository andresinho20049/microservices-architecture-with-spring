package com.andresinho20049.spring_graphql.service.impl;

import org.springframework.stereotype.Service;

import com.andresinho20049.spring_graphql.db.entity.Company;
import com.andresinho20049.spring_graphql.db.repository.CompanyRepository;
import com.andresinho20049.spring_graphql.service.api.CompanyService;

import reactor.core.publisher.Mono;

@Service
public class CompanyServiceImpl implements CompanyService {
	
	private CompanyRepository companyRepository;

	public CompanyServiceImpl(CompanyRepository companyRepository) {
		this.companyRepository = companyRepository;
	}

	@Override
	public Mono<Company> findById(Long id) {
		return companyRepository.findById(id);
	}

	
}
