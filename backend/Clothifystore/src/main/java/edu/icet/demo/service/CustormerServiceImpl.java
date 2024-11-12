package edu.icet.demo.service;

import edu.icet.demo.entity.CustormerEntity;
import edu.icet.demo.model.Custormer;
import edu.icet.demo.repository.CustormerRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<Custormer> getAllCustormer() {
        List<Custormer> custormers=new ArrayList<>();
        repository.findAll().forEach(custormerEntity ->
            custormers.add(mapper.map(custormerEntity,Custormer.class))
        );
        return custormers;
    }
}
