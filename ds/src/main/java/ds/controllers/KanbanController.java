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
import ds.repositories.KanbanRepository;


@RestController
@RequestMapping("/kanban")

public class KanbanController {
	
	private final KanbanRepository kanban_repo;

	@Autowired
	public KanbanController(KanbanRepository kanban_repo) {
		super();
		this.kanban_repo = kanban_repo;
	}
	
    @PostMapping("/")
    public Kanban createkanban( @RequestBody Kanban kanban) {
        return kanban_repo.save(kanban);
    }
	
    @PutMapping("/{id}")
    public ResponseEntity<Kanban> updatekanban(@PathVariable(value = "id") long kanban_Id,
            @RequestBody Kanban kanban_Details){
      	Optional< Kanban> optionelEntity= kanban_repo.findById(kanban_Id);

          Kanban kanban = optionelEntity.get();

          kanban.setTitle(kanban_Details.getTitle());
         // kanban.setLivres(kanban_Details.getLivres());
          final Kanban updatedkanban = kanban_repo.save(kanban);
          return ResponseEntity.ok(updatedkanban);
      }
	
	    @DeleteMapping("/{id}")
	    public String deletekanban(@PathVariable(value = "id") long id ) {
			
	    	kanban_repo.deleteById(id);
			return "kanban suprimer!!";
		}
	    
	    @GetMapping("/{id}")
	    public ResponseEntity<Kanban> getKanbanById(@PathVariable(value = "id")  long kan_ID)
	    {
	    	 Optional<Kanban> optionalLibrary = kanban_repo.findById(kan_ID);
	         if (!optionalLibrary.isPresent()) {
	             return ResponseEntity.unprocessableEntity().build();
	         }

	         return ResponseEntity.ok(optionalLibrary.get());
	        
	          
	    }
	    
	    @GetMapping("")
	    public List<Kanban> getAll() {
	        return kanban_repo.findAll();
	    }
	    

}
