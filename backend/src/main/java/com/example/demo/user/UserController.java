package com.example.demo.user;

import com.example.demo.TableDataLayout;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public TableDataLayout<User> getAllTasks() {
        List<User> tasks = userService.getAllUsers();
        return new TableDataLayout<>(tasks, "success");
    }


    @GetMapping("/{id}")
    public User getTaskById(@PathVariable Long id) {
        return userService.getUserById(id).orElseThrow(() -> new RuntimeException("Task not found"));
    }

    @PostMapping
    public User createTask(@RequestBody User task) {
        return userService.saveUser(task);
    }

    @PutMapping("/{id}")
    public User updateTask(@PathVariable Long id, @RequestBody User taskDetails) {
        User task = userService.getUserById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        task.setUsername(taskDetails.getUsername());
        task.setName(taskDetails.getName());
        task.setEmail(taskDetails.getEmail());
        task.setMobile(taskDetails.getMobile());
        task.setActive(taskDetails.getActive());
        return userService.saveUser(task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
