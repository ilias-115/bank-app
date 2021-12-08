package fr.su.controller;


import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.su.BankBackendApplication;
import fr.su.exception.ResourceNotFoundException;
import fr.su.model.Compte;
import fr.su.repository.CompteRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("db_bank/comptes")
public class CompteController {
	
	
	// pour les logs
	private static final Logger logger = LoggerFactory.getLogger(BankBackendApplication.class);
	private int decouvert = 0;
	@Autowired
	private CompteRepository compteRepository;
	
	@GetMapping()
	public List<Compte> getComptes() {
		logger.info("Liste des comptes récupérée.");
		return this.compteRepository.findAll();
	}
	
	
	@PostMapping()
	public Compte createCompte(@RequestBody Compte compte) {
		//RequestBody convertit un json en objet java
		if(compte.getEmail()==""||compte.getFirstName()==""
				||compte.getLastName()==""||compte.getNumCompte()==0)
			throw new ResourceNotFoundException("information manquante");
		
		logger.info("Compte ajouté : " + compte.getEmail());
		return compteRepository.save(compte);
	}
	
	@GetMapping("/email/{email}")
	public ResponseEntity<Compte> getCompteByEmail(@PathVariable String email) {
		List<Compte> list = compteRepository.findByEmail(email);
		if(list.isEmpty()) {
			logger.error("Compte inexistant.");
			ResponseEntity.badRequest();
		}
			
		logger.info("Compte recupéré : " + list.get(0).getEmail());
		return ResponseEntity.ok(list.get(0));
	}
	
	@GetMapping("/numCompte/{numCompte}")
	public ResponseEntity<Compte> getCompteByNumCompte(@PathVariable int numCompte) {
		List<Compte> list = compteRepository.findByNumCompte(numCompte);
		if(list.isEmpty())
			ResponseEntity.badRequest();
		logger.info("Compte recupéré : " + list.get(0).getEmail());
		return ResponseEntity.ok(list.get(0));
	}
	
	@GetMapping("/getDecouvert")
	public int getDecouvert() {
		logger.info("Le découvert autorisé est de : " + decouvert  + " euros.");
		return decouvert;
	}
	
	@GetMapping("/setDecouvert/{montant}")
	public int setDecouvert(@PathVariable int montant) {
		decouvert = montant;
		logger.info("Le nouveau découvert autorisé est de : " + decouvert  + " euros.");
		return decouvert;
	}
	
	
	@PutMapping("/operation/{id}")
	public ResponseEntity<Compte> operation(@PathVariable int id, 
			@RequestBody Compte compte) {
		Compte updateCompte = compteRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("Compte non trouvé"));
		updateCompte.setEmail(compte.getEmail());
		updateCompte.setFirstName(compte.getFirstName());
		updateCompte.setLastName(compte.getLastName());
		updateCompte.setBalance(compte.getBalance());
		compteRepository.save(updateCompte);

		logger.info("Le compte numéro " + updateCompte.getNumCompte() + 
				" a un solde de : " + updateCompte.getBalance() + " euros.");
		return ResponseEntity.ok(updateCompte);
	}
	
	@GetMapping("/transfert/{numCompte}/{montant}")
	public ResponseEntity<Compte> transfert(@PathVariable int numCompte, 
			@PathVariable int montant) {
		List<Compte> list = compteRepository.findByNumCompte(numCompte);
		if(list.isEmpty())
			ResponseEntity.badRequest();
		Compte res = list.get(0);
		res.setBalance(res.getBalance()+montant);
		compteRepository.save(res);
		
		logger.info("Le compte numéro " + res.getNumCompte() + 
				 " a reçu " + montant + " euros.");
		return ResponseEntity.ok(res);
	}
	
	@GetMapping("/delete/{numCompte}")
	public boolean deleteCompte(@PathVariable int numCompte){
		List<Compte> list = compteRepository.findByNumCompte(numCompte);
		if(list.isEmpty()) {
			logger.error("Le compte numéro " + numCompte + 
					 " n'existe pas.");
			return false;
		}
		Compte res = list.get(0);
		compteRepository.delete(res);
		
		logger.info("Le compte numéro " + res.getNumCompte() + 
				 " a été supprimé.");
		return true;
	}
	
}
 