import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { MatDialog } from '@angular/material/dialog';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { DatePipe, formatDate } from '@angular/common';
import { Adresse } from 'src/app/models/adresse.model';
import { AgGridAngular } from 'ag-grid-angular';
import { UpdateContactComponent } from '../update-contact/update-contact.component';
import { GridApi, GridOptions, Module } from 'ag-grid-community';
import { MatInputComponent } from 'src/app/utils/mat-input.component';
import { Contact } from 'src/app/models/contact.model';
import { DeleteContactComponent } from '../delete-contact/delete-contact.component';



@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  providers: [DatePipe]
})
export class ContactListComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridAngular;
  isDialogMode: Boolean = true;
  isRowSelected = false;

  contacts : Contact[];
  columnDefs = [

    { headerName: 'Nom', field: 'nom', sortable: true, filter: true, editable: true, checkboxSelection: true },
    { headerName: 'Prenom', field: 'prenom', sortable: true, filter: true, editable: true },
    { headerName: 'Date de naissance', field: 'dateNaissance', sortable: true, filter: true, valueFormatter: dateFormatter, editable:true }, //pipe

    { headerName: 'Type d\'adresse', field: 'typeAdresse', sortable: true, filter: true, editable: true, },
    { headerName: 'Type de voie', field: 'typeVoie', sortable: true, filter: true, editable: true, },
    { headerName: 'Rue', field: 'rue', sortable: true, filter: true, editable: true, },
    { headerName: 'Numero', field: 'numero', sortable: true, filter: true, editable: true, },
    { headerName: 'Code postal', field: 'cp', sortable: true, filter: true, editable: true, },
    { headerName: 'Ville', field: 'ville', sortable: true, filter: true, editable: true, },
    { headerName: 'Telephone', field: 'numTelephone', sortable: true, filter: true, editable: true, },
    { headerName: 'Commentaire', field: 'commentaire', sortable: true, filter: true, editable: true, },

  ];

  defaultColDef = { resizable: true };

  rowData = []

  gridApi: GridApi;

  constructor(private contactService: ContactService,
    private dialog: MatDialog,
    @Inject(LOCALE_ID) private locale: string) {

  }

  ngOnInit(): void {
    this.getContacts();
  }

  /**
   * Get the list of contacts and flat the data to be represented in the table
   */
  getContacts() {
    this.contactService.get().subscribe(res => {
      this.contacts = res;
      console.log(this.contacts);
      this.rowData = this.flatData(res);
    });
  }

  /**
   * Get the api reference
   * @param params 
   */
  onGridReady(params) {
    this.gridApi = params.api;
    //this.gridApi.sizeColumnsToFit();
  }

  /**
   * Show the add contact dialog
   * Pass the index to be included
   */
  addContactDialog() {
    const nextIndex = Math.max.apply(Math, this.contacts.map(contact => contact.id));

    const dialogRef = this.dialog.open(AddContactComponent, {data: nextIndex + 1});
    dialogRef.afterClosed().subscribe(result => {
      this.getContacts();
    });

  }

  /**
   * Delete the selected contact(no-multiple selection)
   */
  deleteContacts() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedContact = selectedNodes.map(node => node.data)[0];
    const contact:Contact = this.contacts.find(contact => contact.id == selectedContact.id)

    const dialogRef = this.dialog.open(DeleteContactComponent, { data: contact });
    dialogRef.afterClosed().subscribe(result => {
      this.getContacts();
      this.isRowSelected = false;
    });

  }

  /**
   * Update the selected contact
   */
  updateContactDialog() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedContact = selectedNodes.map(node => node.data)[0];
    const contact:Contact = this.contacts.find(contact => contact.id == selectedContact.id)

    const dialogRef = this.dialog.open(UpdateContactComponent, { data: contact });
    dialogRef.afterClosed().subscribe(result => {
      this.getContacts();
      this.isRowSelected = false;
    });

  }

  /**
   * Send the search term to the backend and return the results
   * (not-really implemented without a real backend)
   * @param event input containing the search term
   */
  search(event) {
    this.contactService.searchContacts(event.target.value).subscribe(res => {
      this.rowData = this.flatData(res);
    })
  }


  /**
   * Flat the given list of contacts to be represented with the grid
   * Duplicated contacts with more than one adress
   * @param contacts a list of contacts
   */
  flatData(contacts) {
    let data = [];
    contacts.forEach(contact => {
      contact.adresses.forEach(adresse => {
        data = [...data, ...[
          {
            id: contact.id,
            nom: contact.nom,
            prenom: contact.prenom,
            dateNaissance: contact.dateNaissance,

            typeAdresse: adresse.typeAdresse,
            typeVoie: adresse.typeVoie,
            rue: adresse.rue,
            numero: adresse.numero,
            ville: adresse.ville,
            cp: adresse.cp,
            commentaire: adresse.commentaire,

            numTelephone: adresse.numTelephone

          }]
        ];
      });

    });

    return data;
  }

  /**
   * Listen for rows to be checked or unchecked
   * Set a boolean variable to enable and disable buttons
   * @param event selection change event
   */
  onSelectionChanged(event){
    if(this.gridApi.getSelectedRows().length > 0){
      this.isRowSelected = true;
    }else {
      this.isRowSelected = false;
    } 
  }
}
/**
 * Pipe the given date text to a more lisible date
 * @param params String date value
 */
function dateFormatter(params) {
  const datePipe = new DatePipe('fr-FR');
  return datePipe.transform(new Date(params.value), 'longDate');
}
/**
 * Convert an object to string
 * @param params Address object
 */
function adresseFormatter(params) {
  const adresses: Adresse[] = params.value;
  return adresses[0].typeAdresse + ' ' +
    adresses[0].typeVoie + '\n' +
    adresses[0].numero + ' ' +
    adresses[0].rue + ' ' +
    adresses[0].cp + ', ' +
    adresses[0].ville + '\n' +
    adresses[0].numTelephone + '\n' +
    adresses[0].commentaire + ' ';
}
