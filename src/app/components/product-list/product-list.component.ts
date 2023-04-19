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

    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }
}
