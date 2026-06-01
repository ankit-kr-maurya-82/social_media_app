# Payment Integration Setup Guide

## Razorpay Configuration

To enable Razorpay payment integration for the premium subscription (₹99/month), you need to set up the following environment variables in your backend `.env` file:

### Required Environment Variables

```env
# Razorpay Keys (Get from https://dashboard.razorpay.com/app/settings/api-keys)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret
```

### How to Get Razorpay Credentials

1. **Sign up or login to Razorpay**: https://dashboard.razorpay.com
2. **Navigate to Settings > API Keys**
3. **Copy the following**:
   - Key ID (Publishable Key)
   - Key Secret (Secret Key)
4. **For Webhook Secret**:
   - Go to Settings > Webhooks
   - Create a new webhook endpoint pointing to: `https://your-domain.com/api/v1/payments/webhook`
   - Copy the Webhook Secret provided

### Payment Endpoints

#### 1. Create Payment Order
**POST** `/api/v1/payments/create-order`
- **Auth**: Required (JWT)
- **Body**: `{ userId: "user_id" }`
- **Response**: Razorpay order object

#### 2. Verify Payment
**POST** `/api/v1/payments/verify-payment`
- **Auth**: Required (JWT)
- **Body**:
  ```json
  {
    "razorpay_order_id": "order_id",
    "razorpay_payment_id": "payment_id",
    "razorpay_signature": "signature",
    "userId": "user_id"
  }
  ```
- **Response**: Updated user subscription details

#### 3. Get Razorpay Key
**GET** `/api/v1/payments/razorpay-key`
- **Auth**: Required (JWT)
- **Response**: `{ key: "razorpay_key_id" }`

#### 4. Webhook Handler
**POST** `/api/v1/payments/webhook`
- **Auth**: No auth required (Razorpay calls this)
- **Headers**: `x-razorpay-signature`
- **Events Handled**: `payment.authorized`, `payment.captured`

### Features Implemented

✅ **Premium Subscription ($99/month or ₹99/month)**
- 30-day subscription period
- Auto-renewal date tracking
- Payment signature verification
- Webhook support for payment confirmations

✅ **Premium Features**
- Detailed analytics dashboard
- Advanced statistics (views, likes, comments, engagement rate)
- Recent posts performance tracking

✅ **User Experience**
- One-click payment integration
- Real-time payment status updates
- Automatic subscription activation
- Error handling and user feedback

### Testing (Sandbox Mode)

Razorpay provides sandbox credentials for testing:
- Card: `4111 1111 1111 1111`
- Expiry: Any future date
- CVV: Any 3 digits

### Security Notes

1. **Never commit actual API keys** to version control
2. **Verify webhook signatures** on the server side (already implemented)
3. **Store credentials in environment variables only**
4. **Use HTTPS only** for payment endpoints in production

### Troubleshooting

**"Razorpay key not configured"**
- Ensure `RAZORPAY_KEY_ID` is set in your `.env` file
- Restart the backend server after updating `.env`

**"Payment signature verification failed"**
- Check that `RAZORPAY_KEY_SECRET` is correct
- Verify the order data is not modified after creation

**"Webhook not triggering"**
- Ensure your backend URL is publicly accessible
- Check webhook configuration in Razorpay dashboard
- Verify `RAZORPAY_WEBHOOK_SECRET` matches dashboard setting

### Next Steps

1. Add your Razorpay credentials to `.env`
2. Restart the backend server
3. Users can now upgrade to premium via the Analytics dashboard
4. Monitor payment metrics in Razorpay dashboard
