package ds.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ds.entities.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

}
