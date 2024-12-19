package com.javaproject.socialblog.springboot.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "report-items")
public class ReportItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    private String contentId;

    private String type;

    private String userReportId;

    private double percentToxic;

}
