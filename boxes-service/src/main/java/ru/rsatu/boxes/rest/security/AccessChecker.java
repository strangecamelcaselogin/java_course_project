package ru.rsatu.boxes.rest.security;

import ru.rsatu.boxes.rest.exception.AccessViolation;

import java.security.Principal;


public class AccessChecker {
    private final UserRole userRole;

    public AccessChecker(Principal auth) {
        this.userRole = new UserRole(auth.getName());
    }

    public boolean isAdmin() {
        return userRole.isAdmin();
    }

    public void onlyAdmin() {
        if (!isAdmin()) {
            throw new AccessViolation();
        }
    }

    public void onlyUser() {
        if (isAdmin()) {
            throw new AccessViolation();
        }
    }
}
