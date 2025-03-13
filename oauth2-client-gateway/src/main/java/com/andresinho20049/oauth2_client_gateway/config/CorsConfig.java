package com.andresinho20049.oauth2_client_gateway.config;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration(proxyBeanMethods = false)
public class CorsConfig {

	private String allowsOrigin;
	
	private final String X_XSRF_TOKEN = "X-XSRF-TOKEN";
	private final String[] ALLOWS_METHODS = {"GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"};

	private static final Logger LOGGER = LoggerFactory.getLogger(CorsConfig.class);
	
	public CorsConfig(@Value("${ALLOWS_CORS_ORIGIN:http://localhost:3000}") String allowsOrigin) {
		this.allowsOrigin = allowsOrigin;
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config = new CorsConfiguration().applyPermitDefaultValues();
		config.addAllowedHeader(HttpHeaders.ACCEPT);
		config.addAllowedHeader(HttpHeaders.HOST);
		config.addAllowedHeader(HttpHeaders.ORIGIN);
		config.addAllowedHeader(HttpHeaders.REFERER);
		config.addAllowedHeader(HttpHeaders.COOKIE);
		config.addAllowedHeader(HttpHeaders.CONTENT_TYPE);
		config.addAllowedHeader(X_XSRF_TOKEN);
		config.setAllowedMethods(Arrays.asList(ALLOWS_METHODS));
		config.setAllowedOrigins(this.allowsOriginToList());
		config.setAllowCredentials(true);
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		return source;
	}

	private List<String> allowsOriginToList() {
		if(Objects.isNull(allowsOrigin)) return Arrays.asList("*");

		LOGGER.debug("AllowsOrigin: {}", allowsOrigin);
		return Arrays.asList(allowsOrigin.split(","));
	}

}
