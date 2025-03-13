package com.andresinho20049.authorization_server.config;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomCorsFilter implements Filter {
	
	@Value("${GATEWAY_CORS_ORIGIN:http://localhost:3000}")
	private String allowsOrigin;
	
	private final String METHOD_OPTIONS = "OPTIONS";
	
	private final String ORIGIN = "Origin";

	private final String ACCESS_CONTROL_ALLOW_ORIGIN = "Access-Control-Allow-Origin";
	private final String ACCESS_CONTROL_ALLOW_HEADERS = "Access-Control-Allow-Headers";
	private final String ACCESS_CONTROL_ALLOW_METHODS = "Access-Control-Allow-Methods";
	private final String ACCESS_CONTROL_ALLOW_CREDENTIALS = "Access-Control-Allow-Credentials";
	
	private final String ALLOW_CREDENTIALS = "true";
	private final String ALLOWS_METHODS = "GET, POST, HEAD, OPTIONS";
	private final String ALLOWS_HEADERS = "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Authorization, Accept, Access-Control-Request-Headers, Access-Control-Request-Method, Content-Type, Cookie, Host, Origin, Referer";
	
	private static final Logger LOGGER = LoggerFactory.getLogger(CustomCorsFilter.class);

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
		
		String origin = req.getHeader(ORIGIN);
		List<String> allowsOriginList = this.allowsOriginToList();
		
		LOGGER.debug("AllowsOrigin: {} - Current Origin: {}", String.join(",", allowsOriginList), origin);
		
		allowsOriginList.stream().filter(o -> origin != null && origin.equals(o)).findFirst().ifPresent(allowedOrigin -> {
			res.setHeader(ACCESS_CONTROL_ALLOW_ORIGIN, allowedOrigin);
		});
		
		res.setHeader(ACCESS_CONTROL_ALLOW_HEADERS, ALLOWS_HEADERS);
		res.setHeader(ACCESS_CONTROL_ALLOW_METHODS, ALLOWS_METHODS);
		res.setHeader(ACCESS_CONTROL_ALLOW_CREDENTIALS, ALLOW_CREDENTIALS);

		String method = req.getMethod();
		if(METHOD_OPTIONS.equalsIgnoreCase(method))
			res.setStatus(HttpServletResponse.SC_OK);
		
		String path = req.getRequestURI().substring(req.getContextPath().length());
		String contentType = request.getContentType();

		LOGGER.debug("Requested by {}, URL path: {} {}, Content type: {} - Response Status: {} ", res.getHeader(ACCESS_CONTROL_ALLOW_ORIGIN), method, path, contentType, res.getStatus());
		
		chain.doFilter(request, response);
	}
	
	private List<String> allowsOriginToList() {
		if(Objects.isNull(allowsOrigin)) return new ArrayList<String>();
		
		return Arrays.asList(allowsOrigin.split(","));
	}

}
