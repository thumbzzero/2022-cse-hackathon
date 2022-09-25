package com.example.banktreeserver.entity;


import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Getter
@Setter
@Entity
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Banktree {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private float startX;
    private float startY;

    private float goalX;
    private float goalY;

//    @Builder
//    public Banktree(Long id){
//        this.id = id;
//        this.startName="testcase1";
//        this.goalName="testcase1";
//        this.startX= (float) 1234.56;
//        this.startY= (float) 1234.56;
//        this.goalX= (float) 1234.566;
//        this.goalY= (float) 1234.566;
//    }
}
