import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Product} from "../common/product";
import {ProductCategory} from "../common/product-category";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';



  constructor(private httpClient : HttpClient) { }
  getProductListPaginate(thePage:number,
                         thePageSize:number,
                         theCategoryId : number)
    :Observable<GetResponseProducts>{
    //need to build based on category
    const searchUrl =
      `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`+
    `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }
  getProductList(theCategoryId : number):Observable<Product[]>{
      //need to build based on category
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }

  getProductCategories():Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductsCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)

    );

  }

  searchProducts(theKeyword: string):Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl);

  }
  private getProducts(searchUrl:string):Observable<Product[]>{
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)

    );
  }

  getProduct(theProductId: number):Observable<Product> {
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }
}
//unwrap the json file
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }
}
  interface GetResponseProductsCategory{
  _embedded:{
    productCategory:ProductCategory[];
  }
  page:{
    size:number,
    totalElements:number,
    totalPages:number,
    number:number
  }
}
