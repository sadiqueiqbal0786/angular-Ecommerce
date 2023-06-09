import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  //templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
 products : Product[]=[];
 currentCategoryId:number = 1;
  previousCategoryId: number=1;
 searchMode: boolean = false;

 //pagination
  thePageNumber:number = 1;
  thePageSize: number = 10;
  theTotalElements:number = 0;


  constructor(private productService:ProductService,
              private route:ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
    this.listProduct();
    });
  }
//check if id is available
  private listProduct() {

    this.searchMode=this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProducts();
    }
    else {
    this.handleListProducts();}
  }

  handleSearchProducts(){
    const theKeyword:string = this.route.snapshot.paramMap.get('keyword')!;
    this.productService.searchProducts(theKeyword).subscribe(
      data =>{
        this.products=data;
      }
    );
  }
  handleListProducts(){
    const hasCategoryId:boolean = this.route.snapshot.paramMap.has('id');
    if(hasCategoryId){
      //get the id and convert to number
      // @ts-ignore
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');

    }
    else {
      //default categoryList
      this.currentCategoryId =1;
    }
    //get the product
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber=1;
    }
    this.previousCategoryId=this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId},
    thePageNumber=${this.thePageNumber}`);

    this.productService.getProductListPaginate(this.thePageNumber-1,
      this.thePageSize,
      this.currentCategoryId).subscribe(
      data => {
        this.products=data._embedded.products;
        //this.thePageNumber= data.page.thePageNumber;
       // this.thePageSize=data.page.size;
       // this.theTotalElements=data.page.theTotalElements;

      }
    )
}
}
