package com.andresinho20049.oauth2_client_gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestCustomizers;
import org.springframework.security.oauth2.client.web.server.DefaultServerOAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.client.web.server.ServerOAuth2AuthorizationRequestResolver;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authentication.logout.DelegatingServerLogoutHandler;
import org.springframework.security.web.server.authentication.logout.SecurityContextServerLogoutHandler;
import org.springframework.security.web.server.authentication.logout.WebSessionServerLogoutHandler;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {
	
	private ReactiveClientRegistrationRepository clientRegistrationRepository;

	public SecurityConfig(ReactiveClientRegistrationRepository clientRegistrationRepository) {
		this.clientRegistrationRepository = clientRegistrationRepository;
	}
	
	@Bean
	SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
	    DelegatingServerLogoutHandler logoutHandler = new DelegatingServerLogoutHandler(
	            new SecurityContextServerLogoutHandler(), new WebSessionServerLogoutHandler());
		
		http
			.csrf(csrf -> csrf.disable())
			.authorizeExchange(authorize -> authorize
				.pathMatchers("/login").permitAll()
				.anyExchange().authenticated())
			.oauth2Login(oauth2Login -> oauth2Login
				.authorizationRequestResolver(authorizationRequestResolver(clientRegistrationRepository)))
			.logout((logout) -> logout.logoutHandler(logoutHandler));
		
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
