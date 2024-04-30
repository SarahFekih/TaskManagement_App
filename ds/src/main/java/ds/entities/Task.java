package ds.entities;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;


@Entity
@Table(name = "task")

public class Task {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String title;
	    private String description;
	    private Date date;
	    @Enumerated(EnumType.STRING)
	    private TaskStatus status;
	    
	    @ManyToOne(fetch = FetchType.LAZY, optional = false)
	    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	    public Kanban kanban;

		public Task() {
		}
		

		public Task(String title, String description, Date date, TaskStatus status) {
			super();
			this.title = title;
			this.description = description;
			this.date = date;
			this.status = status;
		}



		public Task(String title, String description, Date date, TaskStatus status, Kanban kanban) {
			super();
			this.title = title;
			this.description = description;
			this.date = date;
			this.status = status;
			this.kanban = kanban;
		}



		public Task(Long id, String title, String description, Date date, TaskStatus status, Kanban kanban) {
			super();
			this.id = id;
			this.title = title;
			this.description = description;
			this.date = date;
			this.status = status;
			this.kanban = kanban;
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


		public String getDescription() {
			return description;
		}


		public void setDescription(String description) {
			this.description = description;
		}


		public Date getDate() {
			return date;
		}


		public void setDate(Date date) {
			this.date = date;
		}


		public TaskStatus getStatus() {
			return status;
		}


		public void setStatus(TaskStatus status) {
			this.status = status;
		}


		public Kanban getKanban() {
			return kanban;
		}


		public void setKanban(Kanban kanban) {
			this.kanban = kanban;
		}


		@Override
		public String toString() {
			return "Task [id=" + id + ", title=" + title + ", description=" + description + ", date=" + date
					+ ", status=" + status + ", kanban=" + kanban + "]";
		}

		
		

		
}
