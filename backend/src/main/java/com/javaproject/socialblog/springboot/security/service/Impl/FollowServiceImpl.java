package com.javaproject.socialblog.springboot.security.service.Impl;

import com.javaproject.socialblog.springboot.model.Follow;
import com.javaproject.socialblog.springboot.model.User;
import com.javaproject.socialblog.springboot.repository.FollowRepository;
import com.javaproject.socialblog.springboot.repository.UserRepository;
import com.javaproject.socialblog.springboot.security.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService {

    private final UserRepository userRepository;

    private final FollowRepository followRepository;

    @Override
    public void followUser(String followerId, String followedId) {
        User user = userRepository.findById(followerId).orElseThrow(); // Retrieve the user who wants to follow another user.
        User following = userRepository.findById(followedId).orElseThrow(); // Retrieve the user who will be followed.

        Follow follow = new Follow();
        follow.setUser(user.getId());
        follow.setFollowing(following.getId());
        follow.setFollowedAt(LocalDateTime.now());
        followRepository.save(follow);

        user.getFollowing().add(follow);
        following.getFollowers().add(follow);

        userRepository.save(user);
        userRepository.save(following);
    }

    @Override
    public void unfollowUser(String followerId, String followedId) {

    }

    @Override
    public Set<Follow> getFollowers(String userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return user.getFollowers();
    }

    @Override
    public Set<Follow> getFollowing(String userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return user.getFollowing();
    }

}
