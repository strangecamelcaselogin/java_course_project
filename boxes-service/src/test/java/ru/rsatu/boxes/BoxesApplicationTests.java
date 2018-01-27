package ru.rsatu.boxes;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import ru.rsatu.boxes.dao.ClientRepository;
import ru.rsatu.boxes.persistence.Client;

import static org.assertj.core.api.Assertions.assertThat;


@RunWith(SpringRunner.class)
@SpringBootTest
public class BoxesApplicationTests {

	@Autowired
	private TestEntityManager entityManager;

	@Autowired
	private ClientRepository clientRepository;

	@Test
	public void contextLoads() {
	}

	@Test
	public void getClientTest(){
		Client alex = new Client("alex", "alex", "alex", "alex");
		entityManager.persist(alex);
		entityManager.flush();

		Client client = clientRepository.findById(alex.getId());
		assertThat(client.getEmail())
				.isEqualTo(alex.getEmail());
	}

}
