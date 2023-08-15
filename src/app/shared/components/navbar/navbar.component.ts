import { Component, OnInit, ViewChild } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoading!: boolean
  constructor(
    private _loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this._loaderService.lodingStatus
      .subscribe(res => {
        this.isLoading = res
      })
  }

  


}
