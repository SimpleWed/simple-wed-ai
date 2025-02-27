import { Component, inject } from '@angular/core';
import { StripeService } from '../../../services/payment/stripe.service';
import { AuthService } from '../../../services/auth/auth.service';
@Component({
  selector: 'app-stripe-button',
  imports: [],
  templateUrl: './stripe-button.component.html',
  styleUrl: './stripe-button.component.css',
})
export class StripeButtonComponent {
  stripeService = inject(StripeService);
  authService = inject(AuthService);
  async NonSubscriberClickHandler() {
    const priceId = 'price_1Qwrp0FGQGU6uSiYV8Rqv3zM';
    const res = await this.stripeService.getCheckoutUrl(priceId);
    window.location.href = res;
  }

  async subscriberClickHandler() {
    const res = await this.stripeService.getPortalUrl();
    window.location.href = res;
  }
}
