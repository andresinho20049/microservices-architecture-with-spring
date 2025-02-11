package com.andresinho20049.authorization_server.userdetails;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.andresinho20049.authorization_server.model.user.User;

public class UserDetailsCustom extends User implements UserDetails {

    private static final long serialVersionUID = 1L;

    public UserDetailsCustom(User user) {
        super(user);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return super.getRoles();
    }

    @Override
    public String getUsername() {
        return super.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return super.isEnabled();
    }

    @Override
    public boolean isAccountNonLocked() {
        return super.isEnabled();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return super.isEnabled();
    }

    @Override
    public boolean isEnabled() {
        return super.isEnabled();
    }

    @Override
    public String getPassword() {
        return super.getPassword();
    }

}