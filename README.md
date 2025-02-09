# Otobiz - Vehicle Marketplace Platform

A modern vehicle marketplace platform built with React, TypeScript, and Tailwind CSS, featuring a comprehensive interface for vehicle listings, advanced search capabilities, and secure user interactions.

## 🚀 Features

### 🎯 Core Features
- **Advanced Vehicle Search**
  - Filter by make, model, price range, and location
  - Real-time search results
  - Map-based geographical search
  - Save search preferences

- **Vehicle Listings**
  - Grid and map view options
  - Detailed vehicle cards with key specifications
  - High-quality image galleries
  - Price and feature comparisons

- **User Features**
  - User authentication and profiles
  - Favorite vehicles list
  - Saved searches
  - Email notifications
  - Dealer contact system

### 💫 Additional Features
- **Finance Tools**
  - Car loan calculator
  - Monthly payment estimator
  - Insurance quotes
  - Total cost of ownership calculator

- **Content & Resources**
  - Latest automotive news
  - Expert vehicle reviews
  - Maintenance guides
  - Market trends analysis

- **Mobile Experience**
  - Responsive design
  - Mobile app promotion
  - Cross-device synchronization
  - Touch-optimized interface

## 🛠️ Tech Stack

- **Frontend Framework**: React + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Hooks
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/otobiz.git
```

2. Install dependencies:
```bash
cd otobiz
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 🔧 Configuration

1. Create a `.env` file in the root directory:
```env
VITE_APP_TITLE=Otobiz
VITE_BASE_PATH=/
```

## 📚 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── marketplace/
│   │   ├── VehicleCard.tsx
│   │   ├── VehicleGrid.tsx
│   │   ├── SearchBar.tsx
│   │   └── ...
│   └── ui/
├── lib/
│   └── utils.ts
├── types/
│   └── index.ts
└── App.tsx
```

## 🎨 UI Components

The project uses shadcn/ui components for a consistent and modern design:
- Button
- Card
- Dialog
- Input
- Select
- Navigation Menu
- and more...

## 🔐 Authentication

User authentication features include:
- Login/Register system
- Profile management
- Secure sessions
- Password recovery

## 📱 Responsive Design

The platform is fully responsive with:
- Mobile-first approach
- Breakpoint-based layouts
- Touch-friendly interfaces
- Optimized images

## 🚗 Vehicle Features

Comprehensive vehicle management:
- Detailed vehicle profiles
- Multiple image uploads
- Specification management
- Price history tracking

## 🌐 Deployment

To build for production:
```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- shadcn/ui for the component library
- Lucide for the icons
- OpenLayers for the map functionality