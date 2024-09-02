import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../../services/api-service.service';
import { iProduct } from './../../model/iproduct';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})

export class ProductDetailsComponent implements OnInit,OnDestroy {
  product:iProduct={} as iProduct
  pId:any|null=null
  subscription!:Subscription
  constructor(private apiServ:ApiServiceService,private router:Router,private activatedRoute:ActivatedRoute){
  }
  ngOnInit():void
  {
    this.activatedRoute.paramMap.subscribe(param=>{
      this.pId=param.get('id');
    })
    this.getById();
  }

  getById()
  {
    if (this.pId) {
      this.subscription=this.apiServ.getProductById(this.pId).subscribe({
        next: (data: iProduct) => {
          this.product = data;
          console.log(this.product);
        },
      })
  };
}
ngOnDestroy(): void {
  this.subscription.unsubscribe()
}
}
