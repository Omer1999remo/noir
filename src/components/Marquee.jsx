export default function Marquee() {
    const items = [
        'FREE EXPRESS SHIPPING',
        'SUSTAINABLE MATERIALS',
        'LIMITED EDITIONS',
        'FREE EXPRESS SHIPPING',
        'SUSTAINABLE MATERIALS',
        'LIMITED EDITIONS',
    ]

    return (
        <div className="bg-electric text-noir py-4 overflow-hidden border-y border-electric">
            <div className="flex whitespace-nowrap animate-marquee">
                {items.map((item, i) => (
                    <span key={i} className="text-3xl md:text-4xl font-display font-bold mx-4 md:mx-8 flex items-center">
                        {item}
                        <span className="mx-4 md:mx-8 text-2xl">///</span>
                    </span>
                ))}
            </div>
        </div>
    )
}