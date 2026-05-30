import { useEffect, useState } from 'react'
import { Search, ShoppingBag, Menu } from 'lucide-react'
import { useCart } from '../hooks/useCart'

export default function Navigation({ onSearchOpen, onCartOpen }) {
    const [isScrolled, setIsScrolled] = useState(false)
    const { cartCount } = useCart()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={`fixed w-full top-0 z-50 transition-all duration-500 px-6 md:px-12 py-6 ${isScrolled ? 'bg-noir/95 backdrop-blur-xl py-4' : 'bg-transparent'
            }`}>
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                {/* Mobile menu */}
                <button className="md:hidden magnetic-link p-2 hover:text-electric transition-colors" data-cursor="hover">
                    <Menu className="w-6 h-6" />
                </button>

                {/* Logo */}
                <a href="#" className="font-display text-2xl font-bold tracking-tighter magnetic-link md:absolute md:left-1/2 md:-translate-x-1/2" data-cursor="hover">
                    N<span className="text-electric">O</span>IR
                </a>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-12">
                    <a href="#collection" className="magnetic-link text-sm tracking-widest uppercase hover:text-electric transition-colors" data-cursor="hover">
                        Collection
                    </a>
                    <a href="#arrivals" className="magnetic-link text-sm tracking-widest uppercase hover:text-electric transition-colors" data-cursor="hover">
                        New Arrivals
                    </a>
                    <a href="#about" className="magnetic-link text-sm tracking-widest uppercase hover:text-electric transition-colors" data-cursor="hover">
                        About
                    </a>
                </div>

                {/* Icons */}
                <div className="flex items-center gap-6">
                    <button
                        onClick={onSearchOpen}
                        className="magnetic-link p-2 hover:text-electric transition-colors"
                        data-cursor="hover"
                    >
                        <Search className="w-5 h-5" />
                    </button>

                    <button
                        onClick={onCartOpen}
                        className="magnetic-link p-2 hover:text-electric transition-colors relative"
                        data-cursor="hover"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-electric text-noir text-xs font-bold rounded-full flex items-center justify-center transition-transform">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    )
}