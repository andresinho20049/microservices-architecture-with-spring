package com.andresinho20049.oauth2_client_gateway;

import java.util.HashMap;
import java.util.Map;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class Oauth2ClientGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(Oauth2ClientGatewayApplication.class, args);
	}

}

@RestController
class ProfileController {
	
	@GetMapping("userinfo")
	public Map<String, Object> userinfo(@AuthenticationPrincipal OidcUser oidcUser) {
		return new HashMap<>(oidcUser.getAttributes());
	}
	
	@GetMapping("admininfo")
	public Map<String, Object> admininfo(@AuthenticationPrincipal OidcUser oidcUser, @RegisteredOAuth2AuthorizedClient OAuth2AuthorizedClient authorizedClient) {
		Map<String, Object> attributesMap = new HashMap<>();
		attributesMap.put("principal", authorizedClient.getPrincipalName());
		attributesMap.put("clientId", authorizedClient.getClientRegistration().getClientId());
		attributesMap.put("clientName", authorizedClient.getClientRegistration().getClientName());
		attributesMap.put("userAttributes", oidcUser.getClaims());
		attributesMap.put("accessToken", authorizedClient.getAccessToken().getTokenValue());
		return attributesMap;
	}
}