package edu.icet.demo.service;

import edu.icet.demo.model.Custormer;

import java.util.List;

public interface CustormerService {
    void addCustormer(Custormer custormer);

    List<Custormer> getAllCustormer();
}
