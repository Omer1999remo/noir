import { CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-3xl mx-auto text-center">
      <div className="mb-8 reveal-up">
        <CheckCircle className="w-24 h-24 mx-auto text-electric animate-pulse" />
      </div>

      <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 reveal-up stagger-1">
        ORDER CONFIRMED_
      </h1>

      <p className="text-silver text-lg mb-8 reveal-up stagger-2">
        Thank you for your purchase! You will receive an email confirmation shortly.
      </p>

      <div className="bg-charcoal p-8 mb-8 reveal-up stagger-3">
        <p className="text-electric text-sm tracking-widest mb-4">ORDER #NOIR-{Date.now()}</p>
        <p className="text-silver">
          Your order is being processed and will be shipped within 2-3 business days.
        </p>
      </div>

      <div className="space-y-4 reveal-up stagger-4">
        <Link to="/shop" className="btn-primary inline-block" data-cursor="hover">
          Continue Shopping
        </Link>
        <p className="text-silver/50 text-sm">
          Questions? Contact us at <span className="text-electric">support@noir.fashion</span>
        </p>
      </div>
    </div>
  )
}
