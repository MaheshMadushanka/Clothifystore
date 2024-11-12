package edu.icet.demo.controller;

import edu.icet.demo.entity.CustormerEntity;
import edu.icet.demo.model.Custormer;
import edu.icet.demo.service.CustormerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/custormer")
@RequiredArgsConstructor
public class CustormerController {
    private final CustormerService service;

    @PostMapping("/add-custormer")
    @ResponseStatus(HttpStatus.CREATED)
    public void addCustormer(@RequestBody Custormer custormer){
        service.addCustormer(custormer);
    }

    @GetMapping("/get-all")
    public List<CustormerEntity> getAllCustormer(){
        return service.getAllCustormer();
    }
    @DeleteMapping("/delete-by-id/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public String deleteCustormerByID(@PathVariable Integer id){
        return service.deleteCustormerByID(id);
    }
    


}
