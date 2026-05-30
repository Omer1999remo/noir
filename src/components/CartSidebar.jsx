import { Link } from 'react-router-dom'
import { X, Trash2, Plus, Minus } from 'lucide-react'
import { useCart } from '../hooks/useCart'

export default function CartSidebar({ isOpen, onClose }) {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart()

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Sidebar */}
            <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="p-6 border-b border-silver/10 flex justify-between items-center bg-charcoal">
                    <h3 className="font-display text-2xl font-bold">CART_</h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:text-electric transition-colors"
                        data-cursor="hover"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                    {cart.length === 0 ? (
                        <div className="text-center py-12 text-silver/50">
                            <p className="font-display text-lg mb-2">Your cart is empty</p>
                            <p className="text-sm mb-6">Add some fire to your wardrobe</p>
                            <button
                                onClick={onClose}
                                className="btn-outline text-sm"
                                data-cursor="hover"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {cart.map(item => (
                                <div key={item.id + (item.selectedSize || '')} className="flex gap-4 py-4 border-b border-silver/10">
                                    <Link to={`/product/${item.slug}`} onClick={onClose}>
                                        <img src={item.image} alt={item.name} className="w-20 h-24 object-cover bg-noir" />
                                    </Link>
                                    <div className="flex-1">
                                        <Link to={`/product/${item.slug}`} onClick={onClose}>
                                            <h4 className="font-display font-bold mb-1 hover:text-electric transition-colors">{item.name}</h4>
                                        </Link>
                                        <p className="text-silver text-xs mb-1">{item.category}</p>
                                        {item.selectedSize && (
                                            <p className="text-silver text-xs mb-3">Size: {item.selectedSize}</p>
                                        )}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3 border border-silver/20">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="px-3 py-1 hover:bg-silver/10 transition-colors text-sm"
                                                    data-cursor="hover"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="text-sm w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="px-3 py-1 hover:bg-silver/10 transition-colors text-sm"
                                                    data-cursor="hover"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <span className="text-electric font-bold">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-silver/50 hover:text-electric transition-colors self-start"
                                        data-cursor="hover"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="p-6 border-t border-silver/10 bg-charcoal">
                        <div className="flex justify-between mb-2 text-silver text-sm">
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-6 text-xl font-display font-bold text-cream">
                            <span>TOTAL</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <Link
                            to="/checkout"
                            onClick={onClose}
                            className="btn-primary w-full mb-3 block text-center"
                            data-cursor="hover"
                        >
                            Checkout
                        </Link>
                        <button
                            onClick={onClose}
                            className="w-full text-silver text-sm hover:text-cream transition-colors"
                            data-cursor="hover"
                        >
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}