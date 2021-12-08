package fr.su.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fr.su.model.Compte;

@Repository
public interface CompteRepository extends JpaRepository<Compte, Integer>{
	List<Compte> findByEmail(String email);
	List<Compte> findByEmailAndNumCompte(String email, int numCompte);
	List<Compte> findByNumCompte(int numCompte);
}