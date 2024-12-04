package edu.icet.demo.service;

import edu.icet.demo.entity.CustormerEntity;
import edu.icet.demo.model.Custormer;

import java.util.List;

public interface CustormerService {
    void addCustormer(Custormer custormer);

    List<CustormerEntity> getAllCustormer();

    String deleteCustormerByID(Integer id);

    Custormer searchById(Integer id);

    void updateCustormer(Custormer custormer);
}
