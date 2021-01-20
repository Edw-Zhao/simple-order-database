import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss'],
})
export class EditOrderComponent implements OnInit {
  getId: any;
  updateForm: FormGroup;
  seatings: any;
  selectedTable: string;
  activeSeats: any;
  activeTables: any;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.crudService.GetOrder(this.getId).subscribe((res) => {
      this.Order = res;
      this.updateForm.setValue({
        table: res['table'],
        seat: res['seat'],
        appetizer: res['appetizer'],
        drink: res['drink'],
        mainCourse: res['mainCourse'],
        urgency: res['urgency'],
        notes: res['notes'],
        served: res['served'],
        payed: res['payed'],
      });
    });

    this.updateForm = this.formBuilder.group({
      table: [''],
      seat: [''],
      appetizer: [''],
      drink: [''],
      mainCourse: [''],
      urgency: [],
      notes: [''],
      served: [],
      payed: [],
    });
    this.activeTables = [];
    this.selectedTable = '';
    this.activeSeats = [];
  }

  Order: any = [];
  Orders: any = [];
  ngOnInit(): void {
    this.crudService.GetOrders().subscribe((res1) => {
      console.log(res1);
      this.Orders = res1;
      this.Orders.forEach((entry: any) => {
        this.seatings.push(entry.table);
      });
    });
  }

  onChange(e: string): void {
    this.selectedTable = e;
  }

  onUpdate(): any {
    this.crudService.updateOrder(this.getId, this.updateForm.value).subscribe(
      () => {
        console.log('Data updated successfully!');
        this.ngZone.run(() => this.router.navigateByUrl('/list-order'));
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
