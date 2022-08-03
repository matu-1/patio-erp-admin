import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PAGE_ROUTE } from '../../../../constants/page-route.constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form = new FormGroup({});

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.authService
      .login({ user: 'angela', password: 'Ang31aClave*' })
      .subscribe((res) => {
        console.log('res', res.data);
        this.router.navigateByUrl(PAGE_ROUTE.HOME);
      });
  }
}
