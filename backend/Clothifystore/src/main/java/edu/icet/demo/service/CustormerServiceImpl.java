package edu.icet.demo.service;

import edu.icet.demo.entity.CustormerEntity;
import edu.icet.demo.model.Custormer;
import edu.icet.demo.repository.CustormerRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustormerServiceImpl implements CustormerService {
    @Autowired
    private CustormerRepository repository;
    @Autowired
    ModelMapper mapper;

    @Override
    public void addCustormer(Custormer custormer) {
        repository.save(mapper.map(custormer, CustormerEntity.class));
    }
}
