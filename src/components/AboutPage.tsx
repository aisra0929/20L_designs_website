const AboutPage = () => {
  return (
    <div className="min-h-screen py-20 px-8">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-light mb-6 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">
            About
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto rounded-full" />
        </div>

        {/* Story Section - Parallax layers */}
        <div className="relative">
          {/* Background layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 rounded-3xl transform rotate-1" />
          
          {/* Content layer */}
          <div className="relative glass p-12 md:p-20 rounded-3xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl font-light text-foreground">
                  Our Story
                </h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Israel Designs was born from a vision to create clothing that transcends traditional boundaries. We blend modern fashion trends with the richness of local tradition, using locally sourced fabrics and craftsmanship to honor heritage while staying fresh and contemporary.
                  </p>
                  <p>
                    Each piece combines modern style with traditional touches, creating garments that are both meaningful and wearable. By blending contemporary design with cultural inspiration, we produce fashion that respects our roots while embracing innovation.
                  </p>
                  <p>
                    We are committed to giving back to the community by making stylish, trend-setting clothing at very affordable prices. Israel Designs offers high-quality garments that are accessible to everyone, ensuring that minimal design delivers maximum impact.
                  </p>
                </div>
              </div>
              
              {/* Floating design elements */}
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-3xl relative overflow-hidden">
                  {/* Abstract floating shapes */}
                  <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-brand-primary/30 rounded-full animate-float blur-sm" />
                  <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-brand-secondary/30 rounded-full animate-float-delayed blur-sm" />
                  <div className="absolute bottom-1/4 left-1/2 w-24 h-24 bg-brand-accent/20 rounded-full animate-float blur-sm" />
                  
                  {/* Center logo area */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl font-light text-brand-primary/50">
                      ID
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-32 grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Local Craftsmanship",
              description: "We use locally sourced fabrics and skilled artisans to honor tradition while creating modern garments.",
              icon: "◇"
            },
            {
              title: "Modern Meets Tradition",
              description: "Our designs combine contemporary trends with cultural touches, keeping fashion stylish yet meaningful.",
              icon: "◆"
            },
            {
              title: "Affordable Quality",
              description: "High-quality, trend-setting fashion that gives back to the community and remains accessible to everyone.",
              icon: "◈"
            }
          ].map((value, index) => (
            <div key={index} className="group">
              <div className="glass p-8 rounded-2xl h-full hover:shadow-glow transition-all duration-500 hover:scale-105">
                <div className="text-4xl text-brand-primary mb-6 text-center group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-xl font-medium mb-4 text-center text-foreground">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-32 text-center">
          <div className="glass p-12 rounded-3xl inline-block">
            <h3 className="text-3xl font-light mb-4 text-foreground">
              Join the Movement
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Be part of a community that values local craftsmanship, cultural heritage, and modern fashion. Experience trend-setting, affordable style with Israel Designs.
            </p>
            <div className="flex justify-center gap-4">
              <div className="w-3 h-3 bg-brand-primary rounded-full animate-pulse" />
              <div className="w-3 h-3 bg-brand-secondary rounded-full animate-pulse [animation-delay:0.2s]" />
              <div className="w-3 h-3 bg-brand-accent rounded-full animate-pulse [animation-delay:0.4s]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
