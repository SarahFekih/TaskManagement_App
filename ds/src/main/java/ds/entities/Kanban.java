package ds.entities;

import java.util.ArrayList;

import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;




@Entity
@Table(name ="kanban")
public class Kanban {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;

    
    @OneToMany(mappedBy = "kanban",
	        cascade = CascadeType.ALL,
	        orphanRemoval=true
	    )
    private List<Task> tasks;
    
    /*@OneToMany(
            cascade = {CascadeType.ALL},
            fetch = FetchType.EAGER)
    @JoinColumn(name = "kanban_id")
    private List<Task> tasks;*/
    

    public Kanban() {
	}

	public Kanban(Long id, String title, List<Task> tasks) {
		super();
		this.id = id;
		this.title = title;
		this.tasks = tasks;
	}

	public void addTask(Task task) {

        if (Objects.isNull(tasks)) {
            tasks = new ArrayList<>();
        }
        tasks.add(task);
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public List<Task> getTasks() {
		return tasks;
	}

	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;

        for(Task t : tasks) {
            t.setKanban(this);
        }
	}

	@Override
	public String toString() {
		return "Kanban [id=" + id + ", title=" + title + ", tasks=" + tasks + "]";
	}
	
	

}
