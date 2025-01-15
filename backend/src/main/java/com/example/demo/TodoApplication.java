package com.example.demo;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import jakarta.persistence.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@SpringBootApplication
public class TodoApplication {
    public static void main(String[] args) {
        SpringApplication.run(TodoApplication.class, args);
    }
}

@Entity
class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private boolean completed;

    public Task() {}

    public Task(String title, String description, boolean completed) {
        this.title = title;
        this.description = description;
        this.completed = completed;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }
}

@Repository
interface TaskRepository extends JpaRepository<Task, Long> {}

@Service
class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasks() { return taskRepository.findAll(); }
    public Optional<Task> getTaskById(Long id) { return taskRepository.findById(id); }
    public Task saveTask(Task task) { return taskRepository.save(task); }
    public void deleteTask(Long id) { taskRepository.deleteById(id); }
}

@RestController
@RequestMapping("/api/tasks")
class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping
    public TableDataLayout<Task> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();
        return new TableDataLayout<>(tasks, "success");
    }


    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id).orElseThrow(() -> new RuntimeException("Task not found"));
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.saveTask(task);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        Task task = taskService.getTaskById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        task.setCompleted(taskDetails.isCompleted());
        return taskService.saveTask(task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }
}
