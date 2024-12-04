package edu.icet.demo.service;

import edu.icet.demo.entity.CustormerEntity;
import edu.icet.demo.model.Custormer;
import edu.icet.demo.repository.CustormerRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustormerServiceImpl implements CustormerService {
    private final CustormerRepository repository;
    private final ModelMapper mapper;

    @Override
    public void addCustormer(Custormer custormer) {
        repository.save(mapper.map(custormer, CustormerEntity.class));
    }

    @Override
    public List<CustormerEntity> getAllCustormer() {
        List<CustormerEntity> custormers=new ArrayList<>();
        repository.findAll().forEach(custormers::add);
        return custormers;
    }

    @Override
    public String deleteCustormerByID(Integer id) {
        if(repository.existsById(id)){
            repository.deleteById(id);
            return "deleted..";
        }
        return "not found";
    }

    @Override
    public Custormer searchById(Integer id) {
        return mapper.map(repository.findById(id),Custormer.class);

    }

    @Override
    public void updateCustormer(Custormer custormer) {
        repository.save(mapper.map(custormer,CustormerEntity.class));
    }
}
