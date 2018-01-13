package ru.rsatu.boxes.dao;

import ru.rsatu.boxes.domain.Client;


/**
 * Базовый интерфейс для репозиторив клиента.
 * От него наследуем еще один интерфейс (ClientRepository), подмешивая CrudRepository
 * из Спринга.
 * А также делаем реализацию с нашей логикой, которая вызывается при обращениям к ClientRepository
 *   (магия)
 */
public interface ClientRepositoryCustom {
    Client findById(Long id);
}
