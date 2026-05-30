import { X, Heart } from 'lucide-react'
import { useCart } from '../hooks/useCart'

const sizes = ['XS', 'S', 'M', 'L', 'XL']

export default function QuickViewModal({ product, onClose }) {
    const { addToCart } = useCart()

    if (!product) return null

    return (
        <div
            className="fixed inset-0 bg-noir/95 z-[300] flex items-center justify-center p-4 backdrop-blur-xl"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-charcoal max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-silver/20 animate-scale-in">
                <div className="grid md:grid-cols-2">
                    <div className="relative aspect-square md:aspect-auto">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover grayscale"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
                    </div>

                    <div className="p-8 relative">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-silver hover:text-electric transition-colors"
                            data-cursor="hover"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <p className="text-electric text-xs tracking-widest mb-4">{product.category}</p>
                        <h3 className="font-display text-3xl font-bold mb-4">{product.name}</h3>
                        <p className="text-3xl font-display font-bold text-electric mb-6">
                            ${product.price}
                        </p>
                        <p className="text-silver mb-8 leading-relaxed">
                            {product.description || 'Premium construction with attention to every detail. Made for those who refuse to blend in.'}
                        </p>

                        <div className="mb-8">
                            <label className="text-xs tracking-widest text-silver mb-3 block">SIZE</label>
                            <div className="flex gap-3">
                                {sizes.map(size => (
                                    <button
                                        key={size}
                                        className="w-12 h-12 border border-silver/20 hover:border-electric hover:text-electric transition-colors font-display text-sm"
                                        data-cursor="hover"
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => {
                                    addToCart(product)
                                    onClose()
                                }}
                                className="btn-primary flex-1"
                                data-cursor="hover"
                            >
                                Add to Cart
                            </button>
                            <button
                                className="btn-outline px-4"
                                data-cursor="hover"
                            >
                                <Heart className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}