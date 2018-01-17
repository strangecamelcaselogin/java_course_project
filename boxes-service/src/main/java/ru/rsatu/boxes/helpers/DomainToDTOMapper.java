package ru.rsatu.boxes.helpers;

import org.modelmapper.ModelMapper;
import ru.rsatu.boxes.persistence.AbstractEntity;

import java.util.ArrayList;

/**
 * Маппер сущностей на DTO объекты. Помогает не писать много "лишнего" кода
 *   использует ModelMapper (http://modelmapper.org)
 * @param <T> AbstractDTO
 */
public class DomainToDTOMapper<T> {
    private ModelMapper modelMapper = new ModelMapper();

    private Class<T> clazz;

    public DomainToDTOMapper(Class<T> clazz) {
        this.clazz = clazz;
    }

    /**
     * Замапить одну сущность на один DTO объект
     * @param entity сущность из БД
     * @return DTO объект
     */
    public T mapOne(AbstractEntity entity) {
        return modelMapper.map(entity, clazz);
    }

    /**
     * Замапить итерируемое из сущностей на список DTO объектов
     * @param entities сущность из БД
     * @return DTO объект
     */
    public Iterable<T> mapMany(Iterable<? extends AbstractEntity> entities) {
        ArrayList<T> results = new ArrayList<>();

        for (AbstractEntity ae: entities) {
            results.add(modelMapper.map(ae, clazz));
        }

        return results;
    }
}
