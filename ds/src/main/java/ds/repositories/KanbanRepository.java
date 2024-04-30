package ds.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ds.entities.Kanban;

public interface KanbanRepository extends JpaRepository<Kanban, Long>{

}
