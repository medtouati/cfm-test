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
  isAdresseAdding = false;

  updateContactForm: FormGroup;
  updateAdresseForm: FormGroup;
  constructor(private dialogRef: MatDialogRef<UpdateContactComponent>,
              @Inject(MAT_DIALOG_DATA) public contact: Contact,
              private contactService: ContactService) { }

  ngOnInit(): void {
    this.initContactForm();
    //this.initAdresseForm();
  }
  /**
   * Init the update contact form
   */
  initContactForm(){
    this.updateContactForm = new FormGroup({
      id: new FormControl(this.contact.id),
      nom: new FormControl(this.contact.nom, [Validators.required]),
      prenom: new FormControl(this.contact.prenom, [Validators.required]),
      dateNaissance: new FormControl(new Date(this.contact.dateNaissance), [Validators.required]),
    })
  }

  /**
   * init the update adresse form
   * @param adresse 
   */
  initAdresseForm(adresse: Adresse){
    this.updateAdresseForm = new FormGroup({
      id: new FormControl(adresse ? adresse.id : ''),
      typeAdresse: new FormControl(adresse ? adresse.typeAdresse : '', [Validators.required]),
      typeVoie: new FormControl(adresse ? adresse.typeVoie : '', [Validators.required]),
      numero: new FormControl(adresse ? adresse.numero : '', [Validators.required]),
      rue: new FormControl(adresse ? adresse.rue : '', [Validators.required]),
      cp: new FormControl(adresse ? adresse.cp : '', [Validators.required]),
      ville: new FormControl(adresse ? adresse.ville : '', [Validators.required]),
      commentaire: new FormControl(adresse ? adresse.commentaire : ''),
      numTelephone: new FormControl(adresse ? adresse.numTelephone : '', [Validators.required]),

    })
  }

  /**
   * 
   * @param controlName the name of the form control (rue, cp, ...)
   * @param errorName the name of the error (eg: required, pattern, ..)
   * @param form the reference of the form group (addAdresseForm, addContactForm)
   */
  public hasError = (controlName: string, errorName: string, form: FormGroup) => {
    return form.controls[controlName].hasError(errorName);
  };

  /**
   * Validate the new updates and close the dialog
   */
  validate(){
    const contact = {...this.contact, ...this.updateContactForm.value as Contact};
    console.log(contact);
    this.contactService.update(contact).subscribe(res => {
      this.dialogRef.close();
  });    
  }

  /**
   * Show the add adresse form to add a new address
   * @param adresse 
   */
  showAddAdresseForm(adresse: Adresse){
    this.isAdresseAdding = true
    this.initAdresseForm(adresse);
  }

  /**
   * Show and fill the update adresse form to modify an existing update
   * @param adresse 
   */
  showEditAdresseForm(adresse: Adresse){
    this.isAdresseEditing = true
    this.initAdresseForm(adresse);
  }

  /**
   * Add a new address to the contact
   */
  addAdresse(){
    const nextIndex = Math.max.apply(Math, this.contact.adresses.map(adresse => adresse.id)) + 1;

    const adresse = this.updateAdresseForm.value as Adresse;
    adresse.id = nextIndex;
    this.contact.adresses = [...this.contact.adresses, ...[adresse]]
    this.isAdresseAdding = false;

  }
  /**
   * Edit the address
   */
  editAdresse(){
    const newAdresse = this.updateAdresseForm.value as Adresse;
    
    const index = this.contact.adresses.findIndex(adresse => adresse.id == newAdresse.id)
    console.log(newAdresse);
    console.log(index);

    this.contact.adresses[index] = newAdresse;
    this.isAdresseEditing = false;
  }

  /**
   * Delete the selected address
   * @param adresse 
   */
  deleteAdresse(adresse: Adresse){
    const index = this.contact.adresses.indexOf(adresse, 0);
    if (index > -1) {
      this.contact.adresses.splice(index, 1);
   }
  }
}
