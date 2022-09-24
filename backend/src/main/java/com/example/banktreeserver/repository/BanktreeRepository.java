package com.example.banktreeserver.repository;


import com.example.banktreeserver.entity.Banktree;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BanktreeRepository extends JpaRepository<Banktree,Long> {
    List<Banktree> findAll();
}
