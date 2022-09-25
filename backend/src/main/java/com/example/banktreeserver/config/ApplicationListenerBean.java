package com.example.banktreeserver.config;

import com.example.banktreeserver.entity.Banktree;
import com.example.banktreeserver.naverapi.NaverApi;
import com.example.banktreeserver.repository.BanktreeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Optional;

@Component
public class ApplicationListenerBean implements
        ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    NaverApi naverApi;

    @Autowired
    BanktreeRepository banktreeRepository;

    @Override public void onApplicationEvent(ContextRefreshedEvent event) {
      //  naverApi.findBankPath();
    }
}