package ru.rsatu.boxes.helpers;

public class UserRole {
    private String adminRole = "admin";
    private String userRole = "user";
    private String role;

    public UserRole(String email) {
        // TODO имя админа в конфиг
        this.role = email.equals("admin@service") ? adminRole : userRole;
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
