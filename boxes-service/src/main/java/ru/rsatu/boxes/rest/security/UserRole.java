package ru.rsatu.boxes.rest.security;

import java.security.Principal;

public class UserRole {
    private String adminEmail = "admin@service";

    private String adminRole = "admin";
    private String userRole = "user";
    private String role;

    public UserRole(String email) {
        this.role = email.equals(adminEmail) ? adminRole : userRole;
    }

    public UserRole(Principal auth) {
        this.role = auth.getName().equals(adminEmail) ? adminRole : userRole;
    }

    public String getRole() {
        return role;
    }

    public String getAdminRole() {
        return adminRole;
    }

    public String getUserRole() {
        return userRole;
    }

    public boolean isAdmin() {
        return role.equals(adminRole);
    }
}
