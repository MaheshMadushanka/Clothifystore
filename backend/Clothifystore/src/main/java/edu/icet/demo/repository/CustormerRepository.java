package edu.icet.demo.repository;

import edu.icet.demo.entity.CustormerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustormerRepository extends JpaRepository<CustormerEntity,Integer> {
}
