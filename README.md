# Pinterest Wall 🎨

A dreamy, floating image wall that brings your Pinterest boards to life with smooth animations and premium aesthetics.

![Pinterest Wall Demo](https://raw.githubusercontent.com/anirudhsinghdahiya/pinterest-wall/main/demo.png)

## ✨ Current Status

**🚧 Work in Progress - Aesthetic Test Phase**

This project is currently in development and serves as an aesthetic proof-of-concept. The current implementation uses demo Unsplash images while awaiting Pinterest Developer API approval.

## 🎯 Project Vision

The goal is to create an immersive, living mood board that:
- Continuously displays images from your curated Pinterest boards
- Creates a calming, atmospheric visual experience
- Serves as ambient art for your workspace or living space
- Transforms static Pinterest collections into dynamic, flowing displays

Think of it as a digital lava lamp, but with your carefully curated aesthetic instead of blobs.

## 🎨 Current Features

### Premium Aesthetic
- **Atmospheric Background**: Animated gradient that slowly shifts between deep purples and blues
- **Smooth Animations**: Images float gracefully across the screen (45-70 second duration)
- **Visual Depth**: Layered shadows, subtle glow effects, and backdrop blur
- **Elegant Interactions**: Smooth opacity and scale transitions on hover

### Technical Implementation
- Built with **Next.js 14** and **React**
- Animations powered by **Framer Motion**
- Responsive design with **Tailwind CSS**
- TypeScript for type safety
- 580 lines of clean, maintainable code

### Animation System
- Continuous horizontal movement with seamless looping
- Full screen coverage (images positioned from -10% to 110% viewport height)
- Randomized positioning, rotation, and timing for organic feel
- Size variation (180-380px) for visual interest
- No jerky resets - smooth `repeatType: 'loop'` implementation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/anirudhsinghdahiya/pinterest-wall.git
cd pinterest-wall

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the wall.

## 📋 Roadmap

### Phase 1: Aesthetic Foundation ✅
- [x] Smooth continuous animation system
- [x] Premium visual design
- [x] Full screen coverage
- [x] Elegant hover effects

### Phase 2: Pinterest Integration (Pending API Approval)
- [ ] OAuth authentication with Pinterest
- [ ] Fetch images from user's boards
- [ ] Board selection interface
- [ ] Automatic image refresh

### Phase 3: Customization
- [ ] Adjustable animation speed
- [ ] Custom color themes
- [ ] Image size preferences
- [ ] Board filtering options

### Phase 4: Polish
- [ ] Performance optimization
- [ ] Mobile responsiveness
- [ ] Keyboard shortcuts
- [ ] Settings persistence

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Image Optimization**: Next.js Image component
- **API Integration**: Pinterest API (pending approval)

## 📁 Project Structure

```
pinterest-wall/
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page component
├── components/
│   └── FloatingImage.tsx    # Animated image component
├── public/
│   └── pins.json            # Demo image data (temporary)
└── scripts/
    ├── scrape-pinterest.js  # Pinterest API scraper (ready for API approval)
    └── generate-demo-data.js # Demo data generator
```

## 🎭 Design Philosophy

This project prioritizes **aesthetic excellence** over minimalism. The goal is to create something that:
- Feels premium and polished from first glance
- Uses modern web design patterns (gradients, glassmorphism, micro-animations)
- Creates an emotional response - calm, dreamy, inspiring
- Demonstrates technical skill while maintaining code quality

## 🔮 Future Ideas

- **Multi-monitor support**: Span the wall across multiple displays
- **Music integration**: Sync animation speed with ambient music
- **Time-based themes**: Different aesthetics for morning/evening
- **Social features**: Share your wall configuration with others
- **Screensaver mode**: Full-screen mode with no UI elements

## 📝 Notes

- Currently using Unsplash demo images (116 images across various themes)
- Pinterest Developer API application pending approval
- Optimized for desktop viewing (mobile support coming in Phase 4)
- All animations use hardware acceleration for smooth performance

## 🤝 Contributing

This is a personal project, but suggestions and ideas are welcome! Feel free to open an issue to discuss potential improvements.

## 📄 License

MIT License - feel free to use this code for your own projects!

---

**Status**: Waiting for Pinterest Developer API approval to integrate real board data.  
**Last Updated**: November 25, 2024  
**Lines of Code**: 580
