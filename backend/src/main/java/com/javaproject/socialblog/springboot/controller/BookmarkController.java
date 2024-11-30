package com.javaproject.socialblog.springboot.controller;

import com.javaproject.socialblog.springboot.annotation.CheckUserEnabled;
import com.javaproject.socialblog.springboot.security.dto.PostResponse;
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

    @PostMapping("/post/{id}")
    @Operation(
            summary = "Bookmark a post",
            description = "Allows a logged-in user with an enabled account to bookmark a specific post by its ID.",
            tags = "Bookmark Service"
    )
    @CheckUserEnabled
    public ResponseEntity<Void> bookmarkPost(@PathVariable String id) {
        bookmarkService.bookmarkPost(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/post/{id}")
    @Operation(
            summary = "Remove a bookmark",
            description = "Allows a logged-in user with an enabled account to remove a bookmark from a specific post by its ID.",
            tags = "Bookmark Service"
    )
    @CheckUserEnabled
    public ResponseEntity<Void> removeBookmark(@PathVariable String id) {
        bookmarkService.removeBookmark(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    @Operation(
            summary = "Get my bookmarks",
            description = "Retrieves a list of posts bookmarked by the currently logged-in user. The user's account must be enabled.",
            tags = "Bookmark Service"
    )
    @CheckUserEnabled
    public ResponseEntity<List<PostResponse>> getUserBookmarks() {
        return ResponseEntity.ok(bookmarkService.getUserBookmarks());
    }

}
