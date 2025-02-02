package com.andresinho20049.oauth2_client_gateway.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestCustomizers;
import org.springframework.security.oauth2.client.web.server.DefaultServerOAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.client.web.server.ServerOAuth2AuthorizationRequestResolver;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {
	
	@Autowired
	private ReactiveClientRegistrationRepository clientRegistrationRepository;
	
	@Bean
	SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
		http
			.authorizeExchange(authorize -> authorize
					.pathMatchers("/login").permitAll()
					.pathMatchers("/admininfo").hasAnyRole("ADMIN")
					.anyExchange().authenticated())
			.oauth2Login(oauth2Login -> oauth2Login
				.authorizationRequestResolver(authorizationRequestResolver(clientRegistrationRepository)));
		
		return http.build();
	}
	
	private ServerOAuth2AuthorizationRequestResolver authorizationRequestResolver(ReactiveClientRegistrationRepository clientRegistrationRepository) {
		DefaultServerOAuth2AuthorizationRequestResolver authorizationRequestResolver = 
				new DefaultServerOAuth2AuthorizationRequestResolver(clientRegistrationRepository);
		
		authorizationRequestResolver
				.setAuthorizationRequestCustomizer(OAuth2AuthorizationRequestCustomizers.withPkce());
		
		return authorizationRequestResolver;
	}
	
}
