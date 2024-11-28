package com.javaproject.socialblog.springboot.repository;

import com.javaproject.socialblog.springboot.model.Interaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

public interface InteractionRepository extends MongoRepository<Interaction, String> {
}
