package com.andresinho20049.oauth2_client_gateway.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserInfo {
	
	@GetMapping("/userinfo")
	public Map<String, Object> getUserInfo(@AuthenticationPrincipal OidcUser oidcUser) {
		return oidcUser.getAttributes();
	}
	
	@GetMapping("/admin/userinfo")
	public Map<String, Object>  getAdminInfo(@AuthenticationPrincipal OidcUser oidcUser, @RegisteredOAuth2AuthorizedClient OAuth2AuthorizedClient authorizedClient) {
		Map<String, Object> attributesMap = new HashMap<>();
		attributesMap.put("principal", authorizedClient.getPrincipalName());
		attributesMap.put("clientId", authorizedClient.getClientRegistration().getClientId());
		attributesMap.put("clientName", authorizedClient.getClientRegistration().getClientName());
		attributesMap.put("userAttributes", oidcUser.getAttributes());
		return attributesMap;
	}
}
