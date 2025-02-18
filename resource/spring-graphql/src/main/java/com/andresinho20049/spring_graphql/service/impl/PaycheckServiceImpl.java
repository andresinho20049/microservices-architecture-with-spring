package com.andresinho20049.spring_graphql.service.impl;

import java.time.LocalDate;

import org.springframework.r2dbc.core.DatabaseClient.GenericExecuteSpec;
import org.springframework.stereotype.Service;

import com.andresinho20049.spring_graphql.db.entity.Paycheck;
import com.andresinho20049.spring_graphql.db.repository.PaycheckRepository;
import com.andresinho20049.spring_graphql.service.api.PaycheckService;
import com.andresinho20049.spring_graphql.util.AuthenticationUtils;
import com.andresinho20049.spring_graphql.util.DatabaseClientCustom;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class PaycheckServiceImpl implements PaycheckService {
	
	private PaycheckRepository paycheckRepository;
	private DatabaseClientCustom databaseClient;
	
	public PaycheckServiceImpl(PaycheckRepository paycheckRepository, DatabaseClientCustom databaseClient) {
		this.paycheckRepository = paycheckRepository;
		this.databaseClient = databaseClient;
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

	@Override
	public Mono<Paycheck> savePaycheck(Long id, Paycheck paycheck) {
		
		final String sql = """
				SELECT 
					 f.id,
					 f.created_at,
					 f.updated_at,
					 f.updated_username,
					 f.employee_id,
					 f.pay_date,
					 f.gross_earn,
					 f.deduction,
					 f.net_pay,
					 f.company_id
				FROM insert_or_update_paycheck(
					:p_id, 
					:p_employee_id, 
					:p_pay_date, 
					:p_gross_earn, 
					:p_deduction, 
					:p_updated_username, 
					:p_company_id) f
				""";
		
		GenericExecuteSpec genericExecuteSpec = this.databaseClient.sql(sql)
				.bindOptional("p_id", id, Long.class)
				.bindOptional("p_employee_id", paycheck.getEmployeeId(), Long.class)
				.bindOptional("p_pay_date", paycheck.getPayDate(), LocalDate.class)
				.bindOptional("p_gross_earn", paycheck.getGrossEarn(), Double.class)
				.bindOptional("p_deduction", paycheck.getDeduction(), Double.class)
				.bindOptional("p_updated_username", AuthenticationUtils.getUsernameByPrincipal(), String.class)
				.bindOptional("p_company_id", paycheck.getCompanyId(), Long.class)
				.build();
		
		return genericExecuteSpec
			.mapProperties(Paycheck.class)
			.first();
	}

}
