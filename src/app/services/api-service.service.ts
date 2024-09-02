import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { iProduct } from '../model/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private baseApi='http://localhost:3000';
  constructor(private http:HttpClient)
  { }
  getAllProducts():Observable<iProduct[]>
  {
    return this.http.get<iProduct[]>(`${this.baseApi}/products`);
  }
  getProductById(prId:any):Observable<iProduct>
  {
    return this.http.get<iProduct>(`${this.baseApi}/products/${prId}`);
  }
  addNewProduct(product:iProduct):Observable<iProduct[]>
  {
    return this.http.post<iProduct[]>(`${this.baseApi}/products`,product);
  }
  editProduct(product: iProduct, prId: any): Observable<iProduct[]> {
    return this.http.put<iProduct[]>(`${this.baseApi}/products/${prId}`, product);
  }
  deleteProduct(prId:any):Observable<iProduct[]>
  {
    return this.http.delete<iProduct[]>(`${this.baseApi}/products/${prId}`);
  }
}
