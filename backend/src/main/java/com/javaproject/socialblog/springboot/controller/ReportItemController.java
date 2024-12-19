package com.javaproject.socialblog.springboot.controller;

import com.javaproject.socialblog.springboot.model.ReportItem;
import com.javaproject.socialblog.springboot.security.service.ReportItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/report-items")
public class ReportItemController {

    @Autowired
    private ReportItemService service;

    @GetMapping
    public List<ReportItem> getAllReportItems() {
        return service.getAllReportItems();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReportItem> getReportItemById(@PathVariable String id) {
        return service.getReportItemById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ReportItem createReportItem(@RequestBody ReportItem reportItem) {
        return service.createReportItem(reportItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReportItem> updateReportItem(@PathVariable String id, @RequestBody ReportItem reportItem) {
        try {
            ReportItem updatedReportItem = service.updateReportItem(id, reportItem);
            return ResponseEntity.ok(updatedReportItem);
        } catch (RuntimeException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReportItem(@PathVariable String id) {
        try {
            service.deleteReportItem(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException ex) {
            return ResponseEntity.notFound().build();
        }
    }
}
