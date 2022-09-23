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

//    @Builder
//    public Banktree(Long id){
//        this.id = id;
//        this.startName="공평네거리";
//        this.goalName="공평삼거리";
//    }
}
