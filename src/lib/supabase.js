import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Running in demo mode.')
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export async function getProducts(filters = {}) {
  if (!supabase) return getMockProducts(filters)

  let query = supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (filters.category) {
    query = query.eq('category', filters.category)
  }

  if (filters.featured) {
    query = query.eq('featured', true)
  }

  if (filters.inStock !== false) {
    query = query.eq('in_stock', true)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data
}

export async function getProductBySlug(slug) {
  if (!supabase) return getMockProducts().find(p => p.slug === slug)

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data
}

export async function getFeaturedProduct() {
  if (!supabase) {
    const products = getMockProducts()
    return products.find(p => p.featured)
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .maybeSingle()

  if (error) {
    console.error('Error fetching featured product:', error)
    return null
  }

  return data
}

export async function createOrder(orderData) {
  if (!supabase) {
    console.log('Demo mode: Order would be created', orderData)
    return { id: 'demo-order-' + Date.now(), ...orderData }
  }

  const { data: { user } } = await supabase.auth.getUser()

  const { data: order, error } = await supabase
    .from('orders')
    .insert({
      user_id: user?.id,
      status: 'pending',
      total: orderData.total,
      shipping_address: orderData.shippingAddress,
      billing_address: orderData.billingAddress,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating order:', error)
    throw error
  }

  if (orderData.items && orderData.items.length > 0) {
    const orderItems = orderData.items.map(item => ({
      order_id: order.id,
      product_id: item.productId,
      quantity: item.quantity,
      price: item.price,
      size: item.size,
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      console.error('Error creating order items:', itemsError)
    }
  }

  return order
}

export async function getOrders() {
  if (!supabase) return []

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching orders:', error)
    return []
  }

  return data
}

function getMockProducts(filters = {}) {
  const products = [
    {
      id: '1',
      name: 'Deconstructed Blazer',
      slug: 'deconstructed-blazer',
      price: 485,
      original_price: null,
      category: 'Outerwear',
      tag: 'NEW',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop',
      description: 'A deconstructed masterpiece featuring asymmetric lapels and exposed seams.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      in_stock: true,
      featured: true,
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
      description: 'Revolutionary trench coat with dramatic asymmetric hemline.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      in_stock: true,
      featured: false,
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
      description: 'Technical fabric cargo pants with modular pocket system.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      in_stock: true,
      featured: false,
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
      description: 'Extreme oversized fit with raw hem details.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      in_stock: true,
      featured: false,
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
      description: 'Architectural leather bag with geometric hardware.',
      sizes: ['ONE SIZE'],
      in_stock: true,
      featured: false,
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
      description: 'Heavy-duty combat boots with platform sole.',
      sizes: ['36', '37', '38', '39', '40', '41', '42'],
      in_stock: true,
      featured: false,
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
      description: 'Clean lines meet premium cotton in this essential piece.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      in_stock: true,
      featured: false,
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
      description: 'Bold hardware and premium leather construction.',
      sizes: ['S', 'M', 'L'],
      in_stock: true,
      featured: false,
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
      description: 'Luxurious wool blend with sculptural silhouette.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      in_stock: true,
      featured: false,
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
      description: 'Breathable mesh fabric with avant-garde cut.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      in_stock: true,
      featured: false,
    },
  ]

  let filtered = products

  if (filters.category) {
    filtered = filtered.filter(p => p.category === filters.category)
  }

  if (filters.featured) {
    filtered = filtered.filter(p => p.featured)
  }

  return filtered
}
