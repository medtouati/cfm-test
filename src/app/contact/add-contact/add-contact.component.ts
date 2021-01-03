import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
              private contactService: ContactService,
              @Inject(MAT_DIALOG_DATA) public index: number) { }

  ngOnInit(): void {
    this.initContactForm();
    this.initAdresseForm();
  }
  /**
   * Init the add contact form
   */
  initContactForm(){
    this.addContactForm = new FormGroup({
      id: new FormControl(''),
      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      dateNaissance: new FormControl('', [Validators.required]),
    })
  }
  /**
   * Init the add address form
   */
  initAdresseForm(){
    this.addAdresseForm = new FormGroup({
      id: new FormControl(''),
      typeAdresse: new FormControl('', [Validators.required]),
      typeVoie: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required]),
      rue: new FormControl('', [Validators.required]),
      cp: new FormControl('', [Validators.required]),
      ville: new FormControl('', [Validators.required]),
      commentaire: new FormControl(''),
      numTelephone: new FormControl('', [Validators.required]),

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
   * Validate and add the new contact
   * Send the contact to server
   */
  validate(){
    const contact = this.addContactForm.value as Contact;
    const adresse = this.addAdresseForm.value as Adresse;
    contact.adresses = [adresse];
    contact.id = this.index;
    console.log(contact);
    this.contactService.add(contact).subscribe(res => {
      this.dialogRef.close();
    })
    
  }
}
