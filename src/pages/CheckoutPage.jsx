import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Lock, CreditCard, Truck } from 'lucide-react'
import { useCart } from '../hooks/useCart'
import { createOrder } from '../lib/supabase'

export default function CheckoutPage() {
  const { cart, cartTotal, removeFromCart } = useCart()
  const navigate = useNavigate()
  const [loading, setCreatingOrder] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    phone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  })

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
      return
    }

    setCreatingOrder(true)

    try {
      const items = cart.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
        size: item.selectedSize || item.sizes?.[0] || 'ONE SIZE',
      }))

      await createOrder({
        total: cartTotal,
        items,
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          country: formData.country,
          postalCode: formData.postalCode,
          phone: formData.phone,
        },
        billingAddress: {
          email: formData.email,
        },
      })

      cart.forEach(item => removeFromCart(item.id))
      navigate('/order-confirmation')
    } catch (error) {
      console.error('Order creation failed:', error)
    } finally {
      setCreatingOrder(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center px-6">
        <h1 className="font-display text-4xl mb-4">CART IS EMPTY_</h1>
        <p className="text-silver mb-8">Add some items to checkout.</p>
        <Link to="/shop" className="btn-primary" data-cursor="hover">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-silver hover:text-electric transition-colors mb-8"
        data-cursor="hover"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Shop
      </Link>

      <h1 className="font-display text-4xl md:text-5xl font-bold mb-12">CHECKOUT_</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        <form onSubmit={handleSubmit} className="lg:col-span-3">
          <div className="flex gap-4 mb-8">
            <div
              className={`flex items-center gap-2 text-sm ${step >= 1 ? 'text-electric' : 'text-silver/50'}`}
            >
              <span className="w-8 h-8 rounded-full border flex items-center justify-center font-bold">
                1
              </span>
              Shipping
            </div>
            <div className="flex-1 h-px bg-silver/20 self-center" />
            <div
              className={`flex items-center gap-2 text-sm ${step >= 2 ? 'text-electric' : 'text-silver/50'}`}
            >
              <span className="w-8 h-8 rounded-full border flex items-center justify-center font-bold">
                2
              </span>
              Payment
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6 reveal-up">
              <div>
                <label className="text-xs tracking-widest text-silver mb-2 block">EMAIL</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-silver/30 focus:border-electric px-0 py-4 text-cream placeholder-silver/30 outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs tracking-widest text-silver mb-2 block">FIRST NAME</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-silver/30 focus:border-electric px-0 py-4 text-cream placeholder-silver/30 outline-none transition-colors"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-widest text-silver mb-2 block">LAST NAME</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-silver/30 focus:border-electric px-0 py-4 text-cream placeholder-silver/30 outline-none transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs tracking-widest text-silver mb-2 block">ADDRESS</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-silver/30 focus:border-electric px-0 py-4 text-cream placeholder-silver/30 outline-none transition-colors"
                  placeholder="123 Fashion Street"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs tracking-widest text-silver mb-2 block">CITY</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-silver/30 focus:border-electric px-0 py-4 text-cream placeholder-silver/30 outline-none transition-colors"
                    placeholder="Berlin"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-widest text-silver mb-2 block">POSTAL CODE</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-silver/30 focus:border-electric px-0 py-4 text-cream placeholder-silver/30 outline-none transition-colors"
                    placeholder="10115"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs tracking-widest text-silver mb-2 block">COUNTRY</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-silver/30 focus:border-electric px-0 py-4 text-cream placeholder-silver/30 outline-none transition-colors"
                    placeholder="Germany"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-widest text-silver mb-2 block">PHONE</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-silver/30 focus:border-electric px-0 py-4 text-cream placeholder-silver/30 outline-none transition-colors"
                    placeholder="+49 123 456789"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary w-full mt-8 flex items-center justify-center gap-2"
                data-cursor="hover"
              >
                <Truck className="w-5 h-5" />
                Continue to Payment
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 reveal-up">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-silver text-sm hover:text-electric transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Shipping
              </button>

              <div>
                <label className="text-xs tracking-widest text-silver mb-2 block">CARD NUMBER</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                  maxLength={19}
                  className="w-full bg-transparent border-b border-silver/30 focus:border-electric px-0 py-4 text-cream placeholder-silver/30 outline-none transition-colors"
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs tracking-widest text-silver mb-2 block">EXPIRY</label>
                  <input
                    type="text"
                    name="cardExpiry"
                    value={formData.cardExpiry}
                    onChange={handleChange}
                    required
                    maxLength={5}
                    className="w-full bg-transparent border-b border-silver/30 focus:border-electric px-0 py-4 text-cream placeholder-silver/30 outline-none transition-colors"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-widest text-silver mb-2 block">CVC</label>
                  <input
                    type="text"
                    name="cardCVC"
                    value={formData.cardCVC}
                    onChange={handleChange}
                    required
                    maxLength={4}
                    className="w-full bg-transparent border-b border-silver/30 focus:border-electric px-0 py-4 text-cream placeholder-silver/30 outline-none transition-colors"
                    placeholder="123"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full mt-8 flex items-center justify-center gap-2"
                data-cursor="hover"
              >
                <Lock className="w-5 h-5" />
                {loading ? 'PROCESSING...' : `PAY $${cartTotal.toFixed(2)}`}
              </button>

              <p className="text-silver/50 text-xs text-center mt-4 flex items-center justify-center gap-2">
                <Lock className="w-3 h-3" />
                SECURE PAYMENT
              </p>
            </div>
          )}
        </form>

        <div className="lg:col-span-2">
          <div className="bg-charcoal p-6 sticky top-32">
            <h3 className="font-display text-xl font-bold mb-6">ORDER SUMMARY</h3>

            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-20 object-cover bg-noir"
                  />
                  <div className="flex-1">
                    <h4 className="font-display font-bold text-sm">{item.name}</h4>
                    <p className="text-silver text-xs">{item.selectedSize || item.sizes?.[0] || 'ONE SIZE'}</p>
                    <p className="text-xs text-silver">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-electric font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-silver/10 pt-4 space-y-2">
              <div className="flex justify-between text-silver text-sm">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-silver text-sm">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between font-display font-bold text-xl pt-4">
                <span>TOTAL</span>
                <span className="text-electric">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
