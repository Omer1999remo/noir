import { useScrollReveal } from '../hooks/useScrollReveal'

const teamMembers = [
  {
    name: 'Elena Noir',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto=format&fit=crop',
  },
  {
    name: 'Marcus Chen',
    role: 'Head of Design',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop',
  },
  {
    name: 'Yuki Tanaka',
    role: 'Lead Textile Artist',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop',
  },
]

const values = [
  {
    title: 'SUSTAINABILITY',
    description: 'Every piece is crafted with eco-conscious materials and ethical production practices.',
  },
  {
    title: 'INNOVATION',
    description: 'We push boundaries of traditional fashion with avant-garde techniques.',
  },
  {
    title: 'AUTHENTICITY',
    description: 'Original designs that celebrate individuality and self-expression.',
  },
]

export default function AboutPage() {
  const containerRef = useScrollReveal()

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div ref={containerRef}>
        <div className="reveal-up mb-24">
          <p className="text-electric text-sm tracking-widest mb-4">OUR STORY</p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-12">
            BORN FROM<br />
            <span className="text-electric">REBELLION_</span>
          </h1>
          <p className="text-silver text-xl max-w-3xl leading-relaxed">
            NOIR emerged from the underground fashion scene of Berlin in 2018.
            What started as a small collective of designers rejecting mainstream aesthetics
            has evolved into a global movement challenging conventional beauty standards.
          </p>
        </div>

        <div className="reveal-up stagger-1 grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop"
              alt="NOIR Studio"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              WHERE ARCHITECTURE<br />
              MEETS FASHION
            </h2>
            <p className="text-silver text-lg leading-relaxed mb-6">
              Our design philosophy draws inspiration from brutalist architecture and
              industrial landscapes. Each piece is a structural statement, combining
              bold geometric forms with fluid, organic details.
            </p>
            <p className="text-silver text-lg leading-relaxed">
              Based in Berlin with production in Milan, we bridge the gap between
              conceptual fashion and wearable art. Our garments are designed to
              transform the way you move through the world.
            </p>
          </div>
        </div>

        <div className="reveal-up stagger-2 border-t border-silver/10 pt-24 mb-32">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            OUR VALUES_
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <div key={i} className="text-center p-8 border border-silver/10 hover:border-electric transition-colors">
                <h3 className="font-display text-xl font-bold mb-4 text-electric">{value.title}</h3>
                <p className="text-silver leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal-up stagger-3 border-t border-silver/10 pt-24 mb-32">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            THE TEAM_
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, i) => (
              <div key={i} className="group text-center">
                <div className="relative aspect-square mb-6 overflow-hidden bg-charcoal">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="font-display text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-electric text-sm tracking-widest">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal-up stagger-4 border-t border-silver/10 pt-24">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="font-display text-5xl font-bold text-electric mb-2">50K+</p>
              <p className="text-silver text-sm tracking-widest">GLOBAL CUSTOMERS</p>
            </div>
            <div>
              <p className="font-display text-5xl font-bold text-electric mb-2">120+</p>
              <p className="text-silver text-sm tracking-widest">DESIGN AWARDS</p>
            </div>
            <div>
              <p className="font-display text-5xl font-bold text-electric mb-2">15</p>
              <p className="text-silver text-sm tracking-widest">COUNTRIES</p>
            </div>
            <div>
              <p className="font-display text-5xl font-bold text-electric mb-2">100%</p>
              <p className="text-silver text-sm tracking-widest">SUSTAINABLE</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
