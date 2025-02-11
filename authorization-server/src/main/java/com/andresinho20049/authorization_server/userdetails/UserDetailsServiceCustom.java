package com.andresinho20049.authorization_server.userdetails;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.andresinho20049.authorization_server.model.user.User;
import com.andresinho20049.authorization_server.repository.user.UserRepository;

public class UserDetailsServiceCustom implements UserDetailsService {
	
	private UserRepository userRepository;
	
	public UserDetailsServiceCustom(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		Optional<User> user = userRepository.findByUsername(username);
		if(user.isPresent()) {
			return new UserDetailsCustom(user.get());
		}
		
		throw new UsernameNotFoundException("User with username %s Not Found".formatted(username));
	}

}
