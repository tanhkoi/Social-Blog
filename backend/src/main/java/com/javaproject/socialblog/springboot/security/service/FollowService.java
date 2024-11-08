package com.javaproject.socialblog.springboot.security.service;

import com.javaproject.socialblog.springboot.model.Follow;

import java.util.Set;

public interface FollowService {

    void followUser(String followerId, String followedId);

    void unfollowUser(String followerId, String followedId);

    Set<Follow> getFollowers(String userId);

    Set<Follow> getFollowing(String userId);

}
