import { Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react'

const footerLinks = {
    shop: ['New Arrivals', 'Menswear', 'Womenswear', 'Accessories', 'Sale'],
    support: ['Contact', 'Shipping', 'Returns', 'Size Guide', 'FAQ']
}

export default function Footer() {
    return (
        <footer className="bg-charcoal border-t border-silver/10 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <h3 className="font-display text-4xl font-bold mb-6">
                            N<span className="text-electric">O</span>IR
                        </h3>
                        <p className="text-silver max-w-sm mb-8 leading-relaxed">
                            Redefining fashion through the lens of brutalist architecture
                            and underground culture. Made for the bold.
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="text-silver hover:text-electric transition-colors" data-cursor="hover">
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-silver hover:text-electric transition-colors" data-cursor="hover">
                                <Twitter className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-silver hover:text-electric transition-colors" data-cursor="hover">
                                <Youtube className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-display font-bold mb-6 text-cream">SHOP</h4>
                        <ul className="space-y-4 text-silver text-sm">
                            {footerLinks.shop.map(link => (
                                <li key={link}>
                                    <a href="#" className="hover:text-electric transition-colors">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-display font-bold mb-6 text-cream">SUPPORT</h4>
                        <ul className="space-y-4 text-silver text-sm">
                            {footerLinks.support.map(link => (
                                <li key={link}>
                                    <a href="#" className="hover:text-electric transition-colors">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-silver/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-silver/50 text-sm">&copy; 2026 NOIR. All rights reserved.</p>
                    <div className="flex gap-8 text-silver/50 text-sm">
                        <a href="#" className="hover:text-electric transition-colors">Privacy</a>
                        <a href="#" className="hover:text-electric transition-colors">Terms</a>
                        <a href="#" className="hover:text-electric transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}