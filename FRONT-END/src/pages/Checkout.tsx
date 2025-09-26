import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const stripePromise = loadStripe('pk_test_51S3deYFWffD4uDlVoq4aQqDHZWmAWNkaqTVe14YQbnOzS8V8XsSSSUMEB0orvVoYqIUxY7VRMqu9QJvMs3DmswlT001E8mCcXY');

const PROMO_CODES = {
  'SAVE10': 0.10, // 10% off
  'FREESHIP': 0.05 // 5% off
};

// Helper to get theme-aware color
function getCardElementStyle() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return { base: { color: '#fff', fontSize: '16px' }, invalid: { color: '#e53e3e' } };
  }
  return { base: { color: '#000', fontSize: '16px' }, invalid: { color: '#e53e3e' } };
}

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [promo, setPromo] = React.useState('');
  const [promoError, setPromoError] = React.useState<string | null>(null);
  const [discount, setDiscount] = React.useState(0);
  const [paymentMethod, setPaymentMethod] = React.useState<'card' | 'cash'>('card');
  const { t } = useTranslation();

  const totalBeforeDiscount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = totalBeforeDiscount - discount;

  // Shipping address state
  const [shipping, setShipping] = React.useState({
    name: '',
    address: '',
    city: '',
    postal: '',
    country: ''
  });
  const [addressError, setAddressError] = React.useState<string | null>(null);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const validateAddress = () => {
    if (!shipping.name || !shipping.address || !shipping.city || !shipping.postal || !shipping.country) {
      setAddressError('Please fill in all shipping fields.');
      return false;
    }
    setAddressError(null);
    return true;
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promo.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      const discountValue = totalBeforeDiscount * PROMO_CODES[code];
      setDiscount(discountValue);
      setPromoError(null);
    } else {
      setDiscount(0);
      setPromoError(t('checkout.promoInvalid'));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validateAddress()) return;
    setLoading(true);
    if (!stripe || !elements) {
      setError(t('checkout.stripeNotLoaded'));
      setLoading(false);
      return;
    }
    // In a real app, you would fetch a PaymentIntent client secret from your backend here
    setTimeout(() => {
      // Generate a fake order number for demo
      const orderNumber = Math.floor(100000 + Math.random() * 900000);
      // Clear cart after order
      clearCart();
      navigate('/order-confirmation', {
        state: {
          orderNumber,
          cart,
          total,
          shipping
        }
      });
      setLoading(false);
    }, 1500);
  };

  const cardElementStyle = React.useMemo(getCardElementStyle, []);

  return (
    <>
      <div className="mb-8 p-6 rounded-lg bg-muted/50 border border-border">
        <h3 className="text-xl font-semibold mb-4 text-foreground">{t('checkout.yourCart')}</h3>
        {cart.length === 0 ? (
          <div className="text-muted-foreground">{t('checkout.emptyCart')}</div>
        ) : (
          <ul className="mb-4 text-left divide-y divide-border">
            {cart.map(item => (
              <li key={item.id} className="flex items-center justify-between py-2">
                <span className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover border border-border bg-background" />
                  <span className="text-foreground">{item.name} <span className="text-muted-foreground">x{item.quantity}</span></span>
                </span>
                <span className="font-medium text-foreground">{(item.price * item.quantity).toFixed(2)} MAD</span>
              </li>
            ))}
          </ul>
        )}
        <form onSubmit={handleApplyPromo} className="flex gap-2 mb-2">
          <input
            type="text"
            value={promo}
            onChange={e => setPromo(e.target.value)}
            placeholder={t('checkout.promoPlaceholder')}
            className="flex-1 p-2 border border-border rounded bg-background text-foreground"
          />
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded">{t('checkout.apply')}</button>
        </form>
        {promoError && <div className="text-red-500 mb-2">{promoError}</div>}
        {discount > 0 && (
          <div className="text-green-600 mb-2">{t('checkout.promoApplied', { amount: discount.toFixed(2) })}</div>
        )}
        <div className="font-bold text-lg text-right text-foreground">{t('checkout.total')}: {total.toFixed(2)} MAD</div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 text-left">
        <h3 className="text-lg font-semibold mb-2 text-foreground">{t('checkout.shippingAddress')}</h3>
        <div className="grid grid-cols-1 gap-3">
          <input name="name" value={shipping.name} onChange={handleAddressChange} placeholder={t('checkout.fields.fullName')} className="p-2 border border-border rounded bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" />
          <input name="address" value={shipping.address} onChange={handleAddressChange} placeholder={t('checkout.fields.address')} className="p-2 border border-border rounded bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" />
          <input name="city" value={shipping.city} onChange={handleAddressChange} placeholder={t('checkout.fields.city')} className="p-2 border border-border rounded bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" />
          <input name="postal" value={shipping.postal} onChange={handleAddressChange} placeholder={t('checkout.fields.postalCode')} className="p-2 border border-border rounded bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" />
          <input name="country" value={shipping.country} onChange={handleAddressChange} placeholder={t('checkout.fields.country')} className="p-2 border border-border rounded bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" />
        </div>
        {addressError && <div className="text-red-500 mt-1">{addressError}</div>}

        {/* Payment Method Selection */}
        <div className="mb-6">
          <label className="block mb-2 text-foreground font-medium">{t('checkout.paymentMethod')}</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
              />
              <span>{t('checkout.card')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === 'cash'}
                onChange={() => setPaymentMethod('cash')}
              />
              <span>{t('checkout.cash')}</span>
            </label>
          </div>
        </div>

        {/* Conditional Payment UI */}
        {paymentMethod === 'card' && (
          <div className="mb-4">
            <label className="block mb-2 text-foreground font-medium">{t('checkout.cardInfo')}</label>
            <div className="p-3 border border-border rounded bg-background text-foreground">
              <CardElement options={{hidePostalCode: true, style: cardElementStyle}} />
            </div>
          </div>
        )}
        {paymentMethod === 'cash' && (
          <div className="mb-4 p-3 border border-border rounded bg-background text-foreground">
            <p dangerouslySetInnerHTML={{ __html: t('checkout.cashPanel') }} />
          </div>
        )}

        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded shadow hover:bg-primary/90 transition disabled:opacity-50"
          disabled={loading || cart.length === 0}
        >
          {loading ? t('checkout.processing') : paymentMethod === 'card' ? t('checkout.payNow') : t('checkout.placeOrder')}
        </button>
      </form>
    </>
  );
};

const Checkout: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-2 sm:px-4">
      <div className="bg-card p-4 sm:p-8 rounded-xl shadow-lg w-full max-w-lg text-center border border-border mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-primary">Checkout</h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Checkout;
