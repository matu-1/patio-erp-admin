import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PAGE_ROUTE } from '../../../../constants/page-route.constant';
import { authSchema } from '../../configs/form-schema';
import { buildform } from 'src/app/components/text-field/text-field.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form = buildform(authSchema);
  authSchema = authSchema;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    console.log('value', this.form.value);
    this.authService.login(this.form.value).subscribe((res) => {
      console.log('res', res.data);
      this.router.navigateByUrl(PAGE_ROUTE.HOME);
    });
  }
}
