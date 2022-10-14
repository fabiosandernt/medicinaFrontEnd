import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading-animation.service';

@Component({
  selector: 'app-loading-animation',
  templateUrl: './loading-animation.component.html',
  styleUrls: ['./loading-animation.component.css']
})
export class LoadingAnimationComponent implements OnInit {
    loading$ = this.loader.loading$;

    constructor(private loader: LoadingService) {}

    ngOnInit(): void {}
}
