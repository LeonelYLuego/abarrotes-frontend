import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from '../../../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductsFormComponent } from '../products-form/products-form.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns = [
    'name',
    'provider',
    'unitPrice',
    'existence',
    'edit',
    'delete',
  ];

  product: Product = {
    name: '',
    description: '',
    presentation: '',
    expiration: new Date(),
    providerPrice: 0,
    unitPrice: 0,
    existence: 0,
    date: new Date(),
    brand: '',
    provider: 0
  };

  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  async getProducts() {
    this.products = await this.productService.getProducts();
  }


  openDialognew(): void {
    const dialogRef = this.dialog.open(ProductsFormComponent, {
      width: '400px',
      data: undefined,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getProducts();
    });
  }

  openDialog(id: number): void {

    const dialogRef = this.dialog.open(ProductsFormComponent, {
      width: '400px',
      data: id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getProducts();
    });
  }

  deleteProduct(id: number) {
    //console.log(id)
    this.productService.deleteProduct(id).subscribe((res) => {
      alert('Producto eliminado!');
      this.getProducts();
    });
  }
}
