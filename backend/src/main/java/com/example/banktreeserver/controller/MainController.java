package com.example.banktreeserver.controller;


import com.example.banktreeserver.entity.Banktree;
import com.example.banktreeserver.service.BanktreeService;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.Path;
import java.util.List;

@RestController
@RequestMapping
public class MainController {
    @Autowired
    BanktreeService banktreeService;

    @GetMapping("/")
    public List<Banktree> banktree(){
        return banktreeService.banktreeList();
    }


    @GetMapping("/mypath")
    public float[][] given_startgoal_returnXY(@RequestParam("start") String start, @RequestParam("goal") String goal) throws ParseException {

        float[][] mypath = banktreeService.findMypath(start, goal);
        return mypath;
    }
}
