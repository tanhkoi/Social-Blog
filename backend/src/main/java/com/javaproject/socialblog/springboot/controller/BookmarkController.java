package com.javaproject.socialblog.springboot.controller;

import com.javaproject.socialblog.springboot.model.Post;
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
    public ResponseEntity<Void> bookmarkPost(@PathVariable String postId) {

        bookmarkService.bookmarkPost(postId);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/post/{postId}")
    @Operation(tags = "Bookmark Service")
//    @PreAuthorize("hasRole('USER') and #user.enabled")
    public ResponseEntity<Void> removeBookmark(@PathVariable String postId) {

        bookmarkService.removeBookmark(postId);

        return ResponseEntity.noContent().build();
    }

    @GetMapping()
    @Operation(tags = "Bookmark Service")
//    @PreAuthorize("hasRole('USER') and #user.enabled")
    public ResponseEntity<List<Post>> getUserBookmarks() {

        return ResponseEntity.ok(bookmarkService.getUserBookmarks());
    }

}
