package com.javaproject.socialblog.springboot.security.service;

import com.javaproject.socialblog.springboot.model.ReportItem;
import com.javaproject.socialblog.springboot.repository.ReportItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReportItemService {

    @Autowired
    private ReportItemRepository repository;

    public List<ReportItem> getAllReportItems() {
        return repository.findAll();
    }

    public Optional<ReportItem> getReportItemById(String id) {
        return repository.findById(id);
    }

    public ReportItem createReportItem(ReportItem reportItem) {
        return repository.save(reportItem);
    }

    public ReportItem updateReportItem(String id, ReportItem updatedReportItem) {
        return repository.findById(id).map(reportItem -> {
            reportItem.setContentId(updatedReportItem.getContentId());
            reportItem.setType(updatedReportItem.getType());
            reportItem.setUserReportId(updatedReportItem.getUserReportId());
            reportItem.setPercentToxic(updatedReportItem.getPercentToxic());
            return repository.save(reportItem);
        }).orElseThrow(() -> new RuntimeException("ReportItem not found with id: " + id));
    }

    public void deleteReportItem(String id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("ReportItem not found with id: " + id);
        }
    }
}
