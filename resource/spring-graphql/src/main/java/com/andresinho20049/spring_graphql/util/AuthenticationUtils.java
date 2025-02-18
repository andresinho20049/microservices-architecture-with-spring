package com.andresinho20049.spring_graphql.util;
import org.springframework.security.core.context.SecurityContextHolder;

public class AuthenticationUtils {
	
	public static String getUsernameByPrincipal() {
		return SecurityContextHolder.getContext().getAuthentication().getName();
	}

}
