package com.javaproject.socialblog.springboot.controller;

import com.javaproject.socialblog.springboot.model.Bookmark;
import com.javaproject.socialblog.springboot.security.service.BookmarkService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookmarks")
@RequiredArgsConstructor
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @PostMapping("/post/{postId}")
    @Operation(tags = "Bookmark Service")
//    @PreAuthorize("hasRole('USER') and #user.enabled")
    public ResponseEntity<Void> bookmarkPost(@RequestParam String userId, @PathVariable String postId) {

        bookmarkService.bookmarkPost(userId, postId);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/post/{postId}")
    @Operation(tags = "Bookmark Service")
//    @PreAuthorize("hasRole('USER') and #user.enabled")
    public ResponseEntity<Void> removeBookmark(@RequestParam String userId, @PathVariable String postId) {

        bookmarkService.removeBookmark(userId, postId);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{userId}")
    @Operation(tags = "Bookmark Service")
//    @PreAuthorize("hasRole('USER') and #user.enabled")
    public ResponseEntity<List<Bookmark>> getUserBookmarks(@PathVariable String userId) {

        return ResponseEntity.ok(bookmarkService.getUserBookmarks(userId));
    }

}
