import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {

  public user = {
    name: {
      first: '',
      last: ''
    },
    location: {
      street: '',
      city: '',
      postcode: ''
    }
  };

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(
      () => {
        if (router.getCurrentNavigation().extras.state.user) {
          this.user = router.getCurrentNavigation().extras.state.user;
          console.log(this.user);
        }
      }
    );
  }
  
  ngOnInit() {
  }

}
