import { X, Heart, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { useWishlist } from '../hooks/useWishlist'

export default function MobileMenu({ isOpen, onClose, onCartOpen }) {
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()

  if (!isOpen) return null

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/shop?category=Outerwear', label: 'Outerwear' },
    { to: '/shop?category=Tops', label: 'Tops' },
    { to: '/shop?category=Bottoms', label: 'Bottoms' },
    { to: '/shop?category=Accessories', label: 'Accessories' },
    { to: '/wishlist', label: 'Wishlist' },
    { to: '/about', label: 'About' },
  ]

  return (
    <div className="fixed inset-0 z-[300] bg-noir/98 backdrop-blur-xl">
      <div className="flex justify-between items-center p-6 border-b border-silver/10">
        <Link
          to="/"
          onClick={onClose}
          className="font-display text-2xl font-bold tracking-tighter"
          data-cursor="hover"
        >
          N<span className="text-electric">O</span>IR
        </Link>
        <button
          onClick={onClose}
          className="p-2 hover:text-electric transition-colors"
          data-cursor="hover"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="p-6">
        <ul className="space-y-2">
          {navLinks.map(link => (
            <li key={link.to + link.label}>
              <Link
                to={link.to}
                onClick={onClose}
                className="block py-4 font-display text-xl font-bold hover:text-electric transition-colors border-b border-silver/5"
                data-cursor="hover"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-8 left-6 right-6 flex justify-between">
        <button
          onClick={() => {
            onClose()
          }}
          className="flex items-center gap-2 text-silver hover:text-electric transition-colors"
        >
          <Heart className="w-5 h-5" />
          <span>Wishlist ({wishlistCount})</span>
        </button>
        <button
          onClick={() => {
            onClose()
            onCartOpen()
          }}
          className="flex items-center gap-2 text-silver hover:text-electric transition-colors"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Cart ({cartCount})</span>
        </button>
      </div>
    </div>
  )
}
