package edu.icet.demo.controller;

import edu.icet.demo.model.Custormer;
import edu.icet.demo.service.CustormerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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
}
