package ds.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ds.entities.Kanban;
import ds.entities.Task;
import ds.repositories.KanbanRepository;
import ds.repositories.TaskRepository;


@RestController
@RequestMapping("/task")
public class TaskController {
	
	private final KanbanRepository kanban_repo;
	private final TaskRepository task_repo;
	@Autowired
	public TaskController(KanbanRepository kanban_repo, TaskRepository task_repo) {
		super();
		this.kanban_repo = kanban_repo;
		this.task_repo = task_repo;
	}
	
	
    @GetMapping("")
    public List<Task> getAll() {
        return task_repo.findAll();
    }
    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable(value = "id") long id ) {
		
    	task_repo.deleteById(id);
		return "Task suprimer!!";
	}
    
    @GetMapping("/{id}")
    public Optional<Task> getTaskById(@PathVariable(value = "id")  long liv_ID)
    {
        return task_repo.findById(liv_ID);      
    }
	
    @PostMapping("")
    public ResponseEntity<Task> createtask( @RequestBody  Task task) {
        Task savedtask = task_repo.save(task);
        return ResponseEntity.ok(savedtask);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable(value = "id") long task_Id,
            @RequestBody Task task_Details){
      	Optional< Task> optionelEntity= task_repo.findById(task_Id);

          Task task = optionelEntity.get();

          task.setTitle(task_Details.getTitle());
          task.setStatus(task_Details.getStatus());
          task.setDescription(task_Details.getDescription());
          task.setDate(task_Details.getDate());
          final Task updatedtask = task_repo.save(task);
          return ResponseEntity.ok(updatedtask);
      }
	
}
