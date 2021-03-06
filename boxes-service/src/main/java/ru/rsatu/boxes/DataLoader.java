package ru.rsatu.boxes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import ru.rsatu.boxes.dao.BoxRepository;
import ru.rsatu.boxes.dao.CarBrandRepository;
import ru.rsatu.boxes.dao.CarRepository;
import ru.rsatu.boxes.dao.ClientRepository;
import ru.rsatu.boxes.persistence.Box;
import ru.rsatu.boxes.persistence.Car;
import ru.rsatu.boxes.persistence.CarBrand;
import ru.rsatu.boxes.persistence.Client;

import java.util.Arrays;

@Component
public class DataLoader implements ApplicationRunner {
    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private CarBrandRepository carBrandRepository;

    @Autowired
    private BoxRepository boxRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private CarRepository carRepository;

    @Override
    public void run(ApplicationArguments applicationArguments) throws Exception {

        Client admin = new Client(
                "admin@service",
                bCryptPasswordEncoder.encode("adminpassword"),
                "Admin", "657/ Tread.56");

        // Добавим клиентов
        Client firstClient = new Client(
                "user1",
                bCryptPasswordEncoder.encode("password"), // захешируем пароль пользователя
                "UserName", "157/ Tread.56");

        Client secondClient = new Client(
                "user2",
                bCryptPasswordEncoder.encode("password2"),
                "UserName2", "17/ Tread.56");

        clientRepository.save(Arrays.asList(admin, firstClient, secondClient));

        // Добавим марок
        CarBrand mersedesBrand = new CarBrand("Mersedes");
        CarBrand VAZBrand = new CarBrand("Vaz");
        CarBrand KRAZBrand = new CarBrand("KRAZ");
        carBrandRepository.save(Arrays.asList(mersedesBrand, VAZBrand, KRAZBrand));

        // Добавим боксов
        Box box1 = new Box(mersedesBrand, 100L);
        Box box2 = new Box(VAZBrand, 200L);
        Box box3 = new Box(KRAZBrand, 300L);
        boxRepository.save(Arrays.asList(box1, box2, box3));

        // Добавим машин
        Car car1 = new Car(firstClient, mersedesBrand, "777");  // в этой по четным ездит
        Car car2 = new Car(firstClient, VAZBrand, "666");  // в этой по нечетным
        Car car3 = new Car(secondClient, VAZBrand, "134");
        Car car4 = new Car(secondClient, KRAZBrand, "895");
        carRepository.save(Arrays.asList(car1, car2, car3, car4));
    }
}
