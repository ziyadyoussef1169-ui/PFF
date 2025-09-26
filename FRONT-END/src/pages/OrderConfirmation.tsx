import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type CartItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

const OrderConfirmation: React.FC = () => {
  // Get order details from location state
  const location = useLocation();
  const { orderNumber, cart, total } = location.state || {};
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-card p-8 rounded shadow-md w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-6 text-green-600">{t('orderConfirmation.thankYou')}</h2>
        <p className="mb-4">{t('orderConfirmation.placed')}</p>
        {orderNumber && <div className="mb-2 font-semibold">{t('orderConfirmation.orderNumber')} <span className="text-primary">{orderNumber}</span></div>}
        <h3 className="text-lg font-semibold mt-6 mb-2">{t('orderConfirmation.summary')}</h3>
        {cart && cart.length > 0 ? (
          <ul className="mb-2 text-left">
            {cart.map((item: CartItem) => (
              <li key={item.id} className="flex items-center justify-between py-1 border-b last:border-b-0">
                <span className="flex items-center gap-2">
                  <img src={item.image} alt={item.name} className="w-8 h-8 rounded object-cover" />
                  {item.name} x{item.quantity}
                </span>
                <span>{(item.price * item.quantity).toFixed(2)} MAD</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-muted-foreground">{t('orderConfirmation.noItems')}</div>
        )}
        <div className="font-bold text-lg text-right mb-6">{t('orderConfirmation.total')} {total ? total.toFixed(2) : '0.00'} MAD</div>
        <Link to="/shop" className="inline-block bg-primary text-white px-4 py-2 rounded">{t('orderConfirmation.continueShopping')}</Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
