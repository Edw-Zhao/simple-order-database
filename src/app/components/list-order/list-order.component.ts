import { Component, OnInit, Inject } from '@angular/core';
import { CrudService } from './../../service/crud.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css'],
})
export class ListOrderComponent implements OnInit {
  Orders: any = [];

  constructor(private crudService: CrudService, public dialog: MatDialog) {}

  openDialog(note: string): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { note: note },
    });
  }

  ngOnInit(): void {
    this.crudService.GetOrders().subscribe((res) => {
      console.log(res);
      this.Orders = res;
    });
  }

  delete(id: any, i: any) {
    console.log(id);
    if (window.confirm('Delete order?')) {
      this.crudService.deleteOrder(id).subscribe((res) => {
        this.Orders.splice(i, 1);
      });
    }
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `<div class="text-center">{{ data.note }}</div>`,
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
