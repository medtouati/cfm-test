import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Adresse } from 'src/app/models/adresse.model';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  addContactForm: FormGroup;
  addAdresseForm: FormGroup;
  constructor(private dialogRef: MatDialogRef<AddContactComponent>,
    private contactService: ContactService) { }

  ngOnInit(): void {
    this.initContactForm();
    this.initAdresseForm();
  }
  initContactForm(){
    this.addContactForm = new FormGroup({
      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      dateNaissance: new FormControl('', [Validators.required]),
    })
  }
  initAdresseForm(){
    this.addAdresseForm = new FormGroup({
      typeAdresse: new FormControl(''),
      typeVoie: new FormControl(''),
      numero: new FormControl(''),
      rue: new FormControl(''),
      cp: new FormControl(''),
      ville: new FormControl(''),
      commentaire: new FormControl(''),
      numTelephone: new FormControl(''),

    })
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addContactForm.controls[controlName].hasError(errorName);
  };;

  valider(){
    const contact = this.addContactForm.value as Contact;
    const adresse = this.addAdresseForm.value as Adresse;
    contact.adresses = [adresse];
    console.log(contact);
    this.contactService.add(contact).subscribe(res => {
      this.dialogRef.close();
    })
    
  }
}
