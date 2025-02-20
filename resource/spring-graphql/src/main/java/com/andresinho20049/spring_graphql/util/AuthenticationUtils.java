package com.andresinho20049.spring_graphql.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;

public class AuthenticationUtils {

	private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticationUtils.class);
	
	public static String getUsernameByPrincipal() {

		try {
			return SecurityContextHolder.getContext().getAuthentication().getName();
		} catch (Exception e) {
			LOGGER.error("Err: %s".formatted(e.getMessage()), e);
			return "anonymous";
		}

	}

}
