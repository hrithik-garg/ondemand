import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class LoaderComponent implements OnInit{

    loading: boolean = false; 
    constructor(private loaderService: LoaderService){}

    ngOnInit(): void {
      this.loaderService.isLoading.subscribe((res) => {
        this.loading = res;
      });
    }

}
