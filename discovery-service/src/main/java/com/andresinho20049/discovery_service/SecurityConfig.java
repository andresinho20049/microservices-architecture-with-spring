package com.andresinho20049.discovery_service;

import static org.springframework.security.config.Customizer.withDefaults;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			.authorizeHttpRequests(authorize -> authorize
					.requestMatchers(HttpMethod.GET, "/actuator/health").permitAll()
					.anyRequest().authenticated())
			.csrf(csrf -> csrf.disable())
			.cors(cors -> cors.disable())
			.httpBasic(withDefaults());
		
		return http.build();
	}
}