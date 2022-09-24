package com.example.banktreeserver.entity;


import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Setter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Banktree {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String startName;
    private float startX;
    private float startY;
    private String goalName;
    private float goalX;
    private float goalY;
    private float density;

    @Builder
    public Banktree(Long id){
        this.id = id;
        this.startName="testcase1";
        this.goalName="testcase1";
        this.startX= (float) 1234.56;
        this.startY= (float) 1234.56;
        this.goalX= (float) 1234.566;
        this.goalY= (float) 1234.566;
    }
}
