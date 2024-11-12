package edu.icet.demo.controller;

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
    public List<Custormer> getAllCustormer(){
        return service.getAllCustormer();
    }
}
