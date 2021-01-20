import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
})
export class AddOrderComponent implements OnInit {
  orderForm: FormGroup;
  activeTables: any;
  selectedTable: string;
  activeSeats: any;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.orderForm = this.formBuilder.group({
      table: [''],
      seat: [''],
      appetizer: [''],
      drink: [''],
      mainCourse: [''],
      urgency: [],
      notes: [''],
      served: [false],
      payed: [false],
    });
    this.activeTables = [];
    this.selectedTable = '';
    this.activeSeats = [];
  }

  Orders: any = [];
  ngOnInit(): void {
    this.crudService.GetOrders().subscribe((res) => {
      console.log(res);
      this.Orders = res;
      this.Orders.forEach((entry: any) => {
        this.activeTables.push(entry.table);
        this.activeSeats.push([entry.table, entry.seat]);
      });
    });
  }

  checkActiveTable(desiredTable: any) {
    let counter = 0;
    this.activeTables.forEach((table: string) => {
      if (table === desiredTable) {
        counter++;
      }
    });
    if (counter >= 4) {
      return true;
    } else {
      return false;
    }
  }

  onChange(e: string): void {
    this.selectedTable = e;
  }

  checkActiveSeats(desiredSeat: any) {
    let counter = 0;
    console.log(desiredSeat);
    this.activeSeats.forEach((position: any) => {
      if (position[0] === this.selectedTable) {
        console.log(position, this.selectedTable, desiredSeat);
        if (desiredSeat === position[1]) {
          counter++;
        }
      }
    });
    if (counter > 0) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit(): any {
    this.crudService.AddOrder(this.orderForm.value).subscribe(
      () => {
        console.log('Data added successfully!');
        this.ngZone.run(() => this.router.navigateByUrl('/list-order'));
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
