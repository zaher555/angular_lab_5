import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiServiceService } from './../../services/api-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { iProduct } from '../../model/iproduct';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit,OnDestroy {
  allProducts:iProduct[]=[]
  subscription!:Subscription
  constructor(private apiServ:ApiServiceService,private router:Router,private route: ActivatedRoute){}
  ngOnInit(): void {
    this.getProducts();
  }
  getProducts():void
  {
    this.subscription=this.apiServ.getAllProducts().subscribe({
      next:((data:iProduct[])=>{
        this.allProducts=data;
      }),
      error:((err:any)=>{
        console.log("there is a problem",err)
      })
    })
  }
  deleteProduct(id:any)
  {
    this.apiServ.deleteProduct(id).subscribe({
      next:(()=>
      {
        this.router.navigate(['/products']);
        this.allProducts=this.allProducts.filter((product)=>product.id != id)
      })
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
