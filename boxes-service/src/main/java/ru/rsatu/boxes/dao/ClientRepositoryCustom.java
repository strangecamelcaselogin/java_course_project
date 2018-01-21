package ru.rsatu.boxes.dao;

import ru.rsatu.boxes.persistence.CarBrand;
import ru.rsatu.boxes.persistence.Client;

import java.util.List;


/**
 * Базовый интерфейс для репозиторив клиента.
 * От него наследуем еще один интерфейс (ClientRepository), подмешивая CrudRepository
 * из Спринга.
 * А также делаем реализацию с нашей логикой, которая вызывается при обращениям к ClientRepository
 *   (магия)
 */
public interface ClientRepositoryCustom {
    Client findById(Long id);

    Client findByEmail(String email);

    List<Client> getClientsWithBrand(CarBrand brand);
}
