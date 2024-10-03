package com.javaproject.socialblog.springboot.repository;

import com.javaproject.socialblog.springboot.model.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, ObjectId> {

    User findByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);

}
