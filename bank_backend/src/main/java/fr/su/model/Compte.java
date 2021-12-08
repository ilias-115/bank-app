package fr.su.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.Table;



// création de requetes SQL pour communiquer avec la bdd
@Entity
@Table(name = "Compte")
@NamedQuery(name = "Compte.findByEmail",
query = "select c from Compte c where c.email = ?1")
@NamedQuery(name = "Compte.findByEmailAndNumCompte",
query = "select c from Compte c where c.email = ?1 and c.numCompte = ?2")
@NamedQuery(name = "Compte.findByNumCompte",
query = "select c from Compte c where c.numCompte = ?1")
public class Compte {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int numCompte;
	@Column(name = "email")
	private String email;
	@Column(name = "firstName")
	private String firstName;
	@Column(name = "lastName")
	private String lastName;
	@Column(name = "balance")
	private int balance;
	
	public Compte() {
		
	}
	
	public Compte(int numCompte, String email, String firstname, String lastname, int balance) {
		super();
		this.numCompte = numCompte;
		this.email = email;
		this.firstName = firstname;
		this.lastName = lastname;
		this.balance = balance;
	}
	
	public int getNumCompte() {
		return numCompte;
	}
	public void setNumCompte(int numCompte) {
		this.numCompte = numCompte;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstname) {
		this.firstName = firstname;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastname) {
		this.lastName = lastname;
	}
	public int getBalance() {
		return balance;
	}
	public void setBalance(int balance) {
		this.balance = balance;
	}
	
	
}
