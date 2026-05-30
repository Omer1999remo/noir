// Mock data for local development

const mockProducts = [
  {
    id: '1',
    name: 'Deconstructed Blazer',
    slug: 'deconstructed-blazer',
    price: 485,
    original_price: null,
    category: 'Outerwear',
    tag: 'NEW',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop',
    images: [],
    description: 'A deconstructed masterpiece featuring asymmetric lapels and exposed seams. This avant-garde piece challenges traditional tailoring with its raw, unfinished aesthetic.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [],
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Asymmetric Trench',
    slug: 'asymmetric-trench',
    price: 620,
    original_price: null,
    category: 'Outerwear',
    tag: 'HOT',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop',
    images: [],
    description: 'Revolutionary trench coat with dramatic asymmetric hemline. Water-resistant technical fabric meets high fashion.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [],
    in_stock: true,
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Tech Cargo Pants',
    slug: 'tech-cargo-pants',
    price: 340,
    original_price: null,
    category: 'Bottoms',
    tag: null,
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop',
    images: [],
    description: 'Technical fabric cargo pants with modular pocket system. Designed for the urban explorer.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [],
    in_stock: true,
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Oversized Hoodie',
    slug: 'oversized-hoodie',
    price: 280,
    original_price: 350,
    category: 'Knitwear',
    tag: 'SALE',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop',
    images: [],
    description: 'Extreme oversized fit with raw hem details. Premium heavyweight cotton for ultimate comfort.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [],
    in_stock: true,
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Sculptural Bag',
    slug: 'sculptural-bag',
    price: 395,
    original_price: null,
    category: 'Accessories',
    tag: 'NEW',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop',
    images: [],
    description: 'Architectural leather bag with geometric hardware. A statement piece for the bold.',
    sizes: ['ONE SIZE'],
    colors: [],
    in_stock: true,
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Combat Boots',
    slug: 'combat-boots',
    price: 450,
    original_price: null,
    category: 'Footwear',
    tag: null,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
    images: [],
    description: 'Heavy-duty combat boots with platform sole. Built to last, designed to stand out.',
    sizes: ['36', '37', '38', '39', '40', '41', '42'],
    colors: [],
    in_stock: true,
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Minimalist T-Shirt',
    slug: 'minimalist-tshirt',
    price: 125,
    original_price: null,
    category: 'Tops',
    tag: null,
    image: 'https://images.unsplash.com/photo-1521572163474-60672f1f0f50?q=80&w=800&auto=format&fit=crop',
    images: [],
    description: 'Clean lines meet premium cotton in this essential piece. The perfect foundation for any look.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [],
    in_stock: true,
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Statement Belt',
    slug: 'statement-belt',
    price: 195,
    original_price: null,
    category: 'Accessories',
    tag: null,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop',
    images: [],
    description: 'Bold hardware and premium leather construction. Transform any outfit instantly.',
    sizes: ['S', 'M', 'L'],
    colors: [],
    in_stock: true,
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: '9',
    name: 'Wool Overcoat',
    slug: 'wool-overcoat',
    price: 890,
    original_price: null,
    category: 'Outerwear',
    tag: 'HOT',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800&auto=format&fit=crop',
    images: [],
    description: 'Luxurious wool blend with sculptural silhouette. Timeless elegance meets modern design.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [],
    in_stock: true,
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: '10',
    name: 'Mesh Long Sleeve',
    slug: 'mesh-long-sleeve',
    price: 210,
    original_price: null,
    category: 'Tops',
    tag: 'NEW',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c5a877?q=80&w=800&auto=format&fit=crop',
    images: [],
    description: 'Breathable mesh fabric with avant-garde cut. Layer it or wear it alone for maximum impact.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [],
    in_stock: true,
    featured: false,
    created_at: new Date().toISOString(),
  },
]

let mockOrders = []
let mockWishlist = []

export async function getProducts(filters = {}) {
  let products = [...mockProducts]

  if (filters.category) {
    products = products.filter(p => p.category === filters.category)
  }

  if (filters.featured) {
    products = products.filter(p => p.featured === true)
  }

  if (filters.inStock !== false) {
    products = products.filter(p => p.in_stock !== false)
  }

  return products
}

export async function getProductBySlug(slug) {
  return mockProducts.find(p => p.slug === slug) || null
}

export async function getFeaturedProduct() {
  return mockProducts.find(p => p.featured) || mockProducts[0]
}

export async function createOrder(orderData) {
  const order = {
    id: 'order-' + Date.now(),
    status: 'pending',
    total: orderData.total,
    shipping_address: orderData.shippingAddress,
    billing_address: orderData.billingAddress,
    items: orderData.items,
    created_at: new Date().toISOString(),
  }

  mockOrders.push(order)
  console.log('Order created:', order)
  return order
}

export async function getOrders() {
  return mockOrders
}

export async function getWishlist() {
  return mockWishlist
}

export async function addToWishlist(productId) {
  const product = mockProducts.find(p => p.id === productId)
  if (product && !mockWishlist.find(w => w.id === productId)) {
    mockWishlist.push(product)
  }
  return mockWishlist
}

export async function removeFromWishlist(productId) {
  mockWishlist = mockWishlist.filter(w => w.id !== productId)
  return mockWishlist
}

// Export supabase as null since we're using mock data
export const supabase = null
