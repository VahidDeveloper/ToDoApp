package com.example.demo; // Adjust the package name as per your structure

import java.util.List;

public class TableDataLayout<T> {
    private List<T> result;
    private String status;

    public TableDataLayout(List<T> result, String status) {
        this.result = result;
        this.status = status;
    }

    // Getters and Setters
    public List<T> getResult() {
        return result;
    }

    public void setResult(List<T> result) {
        this.result = result;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
