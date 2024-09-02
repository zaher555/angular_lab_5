import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { iProduct } from '../../model/iproduct';
import { ApiServiceService } from '../../services/api-service.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit, OnDestroy {
  newProduct!: iProduct;
  product!: iProduct;
  pId: string | null = null;
  subscription!: Subscription;
  updatedProduct!:iProduct;
  addProductForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    quantity: new FormControl('', [Validators.required])
  });

  constructor(
    private apiServ: ApiServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      this.pId = param.get('id');
      this.getById();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  assignData() {
    this.newProduct = this.addProductForm.value;
    console.log(this.newProduct);
    this.sendData();
  }

  sendData() {
    this.apiServ.addNewProduct(this.newProduct).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: err => console.error('Error adding product', err)
    });
  }

  get name() {
    return this.addProductForm.get('name');
  }

  get price() {
    return this.addProductForm.get('price');
  }

  get quantity() {
    return this.addProductForm.get('quantity');
  }

  editData() {
    this.updatedProduct = this.addProductForm.value;
    if (this.pId) {
      this.subscription = this.apiServ.editProduct(this.updatedProduct,this.pId).subscribe({
        next: () => {
          this.router.navigate(['/products']);
        },
        error: err => console.error('Error fetching product', err)
      });
    }
  }

  getById() {
    if (this.pId) {
      this.subscription = this.apiServ.getProductById(this.pId).subscribe({
        next: (data: iProduct) => {
          this.product = data;
          console.log(this.product);
          this.addProductForm.patchValue(this.product); // Initialize the form with the existing data
        },
        error: err => console.error('Error fetching product', err)
      });
    }
  }
}
