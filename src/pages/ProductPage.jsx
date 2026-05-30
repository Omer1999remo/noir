import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react'
import { getProductBySlug, getProducts } from '../lib/supabase'
import { useCart } from '../hooks/useCart'
import { useWishlist } from '../hooks/useWishlist'

export default function ProductPage() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState(null)
  const [currentImage, setCurrentImage] = useState(0)
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()

  useEffect(() => {
    loadProduct()
  }, [slug])

  async function loadProduct() {
    setLoading(true)
    const productData = await getProductBySlug(slug)
    setProduct(productData)

    if (productData) {
      const allProducts = await getProducts()
      const related = allProducts
        .filter(p => p.category === productData.category && p.id !== productData.id)
        .slice(0, 4)
      setRelatedProducts(related)
    }

    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-electric border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center px-6">
        <h1 className="font-display text-4xl mb-4">NOT FOUND_</h1>
        <p className="text-silver mb-8">The product you're looking for doesn't exist.</p>
        <Link to="/shop" className="btn-primary" data-cursor="hover">
          Back to Shop
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 1) {
      alert('Please select a size')
      return
    }
    addToCart({ ...product, selectedSize: selectedSize || product.sizes[0] })
  }

  const images = product.images?.length > 0 ? [product.image, ...product.images] : [product.image]

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
        <div className="relative reveal-up">
          <div className="relative aspect-[3/4] overflow-hidden bg-charcoal">
            <img
              src={images[currentImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImage(i => i === 0 ? images.length - 1 : i - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-noir/80 flex items-center justify-center hover:bg-electric hover:text-noir transition-colors"
                  data-cursor="hover"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setCurrentImage(i => i === images.length - 1 ? 0 : i + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-noir/80 flex items-center justify-center hover:bg-electric hover:text-noir transition-colors"
                  data-cursor="hover"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 mt-4">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`w-20 h-24 overflow-hidden ${currentImage === i ? 'ring-2 ring-electric' : ''}`}
                  data-cursor="hover"
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="reveal-up stagger-1">
          <p className="text-electric text-sm tracking-widest mb-4">{product.category}</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">{product.name}</h1>

          <div className="flex items-center gap-4 mb-6">
            <p className="text-4xl font-display font-bold text-electric">${product.price}</p>
            {product.original_price && (
              <p className="text-silver/50 line-through text-xl">${product.original_price}</p>
            )}
          </div>

          <p className="text-silver text-lg leading-relaxed mb-8">{product.description}</p>

          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-8">
              <label className="text-xs tracking-widest text-silver mb-3 block">SIZE</label>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[48px] h-12 px-4 border transition-colors font-display text-sm ${
                      selectedSize === size
                        ? 'border-electric text-electric'
                        : 'border-silver/20 hover:border-electric'
                    }`}
                    data-cursor="hover"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              className="btn-primary flex-1"
              data-cursor="hover"
            >
              Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className={`btn-outline px-4 ${isInWishlist(product.id) ? 'border-electric text-electric' : ''}`}
              data-cursor="hover"
            >
              <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
            </button>
          </div>

          <div className="border-t border-silver/10 pt-6">
            <div className="flex items-center gap-4 text-sm text-silver">
              <button className="flex items-center gap-2 hover:text-electric transition-colors" data-cursor="hover">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>

          {product.tag && (
            <div className="mt-6 inline-block bg-electric/10 text-electric px-4 py-2 text-sm tracking-widest">
              {product.tag}
            </div>
          )}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="reveal-up">
          <h2 className="font-display text-3xl font-bold mb-8">YOU MAY ALSO LIKE_</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <Link
                key={p.id}
                to={`/product/${p.slug}`}
                className="product-card group cursor-none"
                data-cursor="hover"
              >
                <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-charcoal">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-display text-lg font-bold mb-1 group-hover:text-electric transition-colors">
                  {p.name}
                </h3>
                <p className="text-electric font-bold">${p.price}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
