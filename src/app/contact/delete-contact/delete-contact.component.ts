import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-delete-contact',
  templateUrl: './delete-contact.component.html',
  styleUrls: ['./delete-contact.component.scss']
})
export class DeleteContactComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Contact,
              private dialogRef: MatDialogRef<DeleteContactComponent>,
              private contactService: ContactService) { }

  ngOnInit(): void {
  }

  /**
   * Send a delete request to the server
   */
  deleteContact(){
    this.contactService.delete(this.data).subscribe(res => {
      this.dialogRef.close();
    })
  }
  /**
   * Cancel and close the dialog
   */
  cancel(){
    this.dialogRef.close();
    
  }
}
