import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Product} from "../common/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';



  constructor(private httpClient : HttpClient) { }
  getProductList(theCategoryId : number):Observable<Product[]>{
      //need to build based on category
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.products)

    );
  }
}
//unwrap the json file
interface GetResponse{
  _embedded:{
    products:Product[];
  }
}
