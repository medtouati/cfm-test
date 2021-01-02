import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Adresse } from 'src/app/models/adresse.model';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.scss']
})
export class UpdateContactComponent implements OnInit {

  isAdresseEditing = false;

  updateContactForm: FormGroup;
  updateAdresseForm: FormGroup;
  constructor(private dialogRef: MatDialogRef<UpdateContactComponent>,
              @Inject(MAT_DIALOG_DATA) public contact: Contact,
              private contactService: ContactService) { }

  ngOnInit(): void {
    this.initContactForm();
    //this.initAdresseForm();
  }
  initContactForm(){
    this.updateContactForm = new FormGroup({
      nom: new FormControl(this.contact.nom, [Validators.required]),
      prenom: new FormControl(this.contact.prenom, [Validators.required]),
      dateNaissance: new FormControl(this.contact.dateNaissance, [Validators.required]),
    })
  }
  initAdresseForm(adresse: Adresse){
    this.updateAdresseForm = new FormGroup({
      typeAdresse: new FormControl(adresse.typeAdresse),
      typeVoie: new FormControl(adresse.typeVoie),
      numero: new FormControl(adresse.numero),
      rue: new FormControl(adresse.rue),
      cp: new FormControl(adresse.cp),
      ville: new FormControl(adresse.ville),
      commentaire: new FormControl(adresse.commentaire),
      numTelephone: new FormControl(adresse.numTelephone),

    })
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.updateContactForm.controls[controlName].hasError(errorName);
  };;

  valider(){
    const contact = this.updateContactForm.value as Contact;
    const adresse = this.updateAdresseForm.value as Adresse;
    contact.adresses = [adresse];
    console.log(contact);
    this.contactService.update(contact).subscribe(res => {
      this.dialogRef.close();
  });    
  }

  editAdresse(adresse: Adresse){
    this.isAdresseEditing = true
    this.initAdresseForm(adresse);
  }

  deleteAdresse(adresse: Adresse){
    const index = this.contact.adresses.indexOf(adresse, 0);
    if (index > -1) {
      this.contact.adresses.splice(index, 1);
   }
   

  }
}
