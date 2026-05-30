import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('noir-wishlist')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('noir-wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const addToWishlist = useCallback((product) => {
    setWishlist(prev => {
      if (prev.find(item => item.id === product.id)) {
        return prev
      }
      return [...prev, product]
    })
  }, [])

  const removeFromWishlist = useCallback((productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId))
  }, [])

  const isInWishlist = useCallback((productId) => {
    return wishlist.some(item => item.id === productId)
  }, [wishlist])

  const toggleWishlist = useCallback((product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }, [isInWishlist, addToWishlist, removeFromWishlist])

  const clearWishlist = useCallback(() => {
    setWishlist([])
  }, [])

  const wishlistCount = wishlist.length

  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      toggleWishlist,
      clearWishlist,
      wishlistCount,
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
