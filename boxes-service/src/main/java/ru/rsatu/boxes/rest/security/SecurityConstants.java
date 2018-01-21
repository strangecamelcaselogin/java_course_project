package ru.rsatu.boxes.rest.security;

public class SecurityConstants {
    public static final String SECRET = "SecretKeyToGenJWTs";  // TODO поменять

    // Имя заголовка, в который запишем JWT в ответ
    public static final String HEADER_STRING = "Authorization";

    // Префикс для JWT
    public static final String TOKEN_PREFIX = "Bearer ";

    // Время протухания - 10 дней (измеряется в мс)
    public static final long EXPIRATION_TIME = 10 * 24 * 3600 * 1000;

    // URL на котором происходит регистрация
    public static final String SIGN_UP_URL = "/clients";

    public static final String CAR_BRANDS_URL = "/car_brands";
}
