# Torchlight Infinite Farm Profit Calculator

A comprehensive web-based tool for tracking farming efficiency in Torchlight Infinite. Calculate your actual profit per hour with precise inventory tracking and automatic tax calculations.

## 🚀 Live Demo

**[Deploy on GitHub Pages]** - Simply upload `calculator.html` to your repository and enable GitHub Pages.

## ✨ Key Features

### 📊 **Inventory Tracking System**
- **Before/After Tracking**: Record starting and ending quantities for each item
- **Automatic Change Calculation**: See gains (+) and losses (-) at a glance
- **Smart Tax Logic**: Only profits are taxed, costs are tax-free
- **Visual Indicators**: Green for profits, red for costs, gray for neutral

### 💰 **Intelligent Tax Calculation**
- **Auction House Tax**: Automatic 1/8 tax on all taxable revenue
- **Flame Elementium Exempt**: Base currency is never taxed
- **Real-time Updates**: Tax calculations update as you type

### 🎯 **Auto-Pricing Database**
- **250+ Items**: Comprehensive database with current market prices
- **Instant Price Fill**: Select an item name and price auto-populates
- **Price Updates**: Changing item names automatically updates prices
- **Easy Swapping**: Switch between items in the same row seamlessly

### ⏱️ **Advanced Timer System**
- **Precision Timing**: Track your farming sessions to the second
- **Keyboard Shortcuts**: `Space` to start/stop, `R` to reset
- **Live Metrics**: Real-time profit per hour calculations
- **Session Persistence**: Timer state saved between browser sessions

### 📁 **Flexible Data Management**
- **Selective Export**: Choose what to export (Inventory, Results, or Full data)
- **Smart Import**: Handles different file formats automatically
- **Data Persistence**: Everything saved locally in your browser
- **Backup & Share**: Export your data for backup or sharing with others

## 🎮 How to Use

### **Starting a Session**
1. Click **Start** or press `Space` to begin timing
2. Click **+ Add Item** to start tracking inventory
3. Enter item names (autocomplete will help you)
4. Fill in **Before** quantities (what you had when you started)

### **During Farming**
- Update **After** quantities as you farm
- Add new items as you find them
- Watch your profit/hour update in real-time

### **Example Tracking**
```
Item: Ultimate Ember
Before: 5    After: 12    Change: +7    Price: 18 FE    Net: +126 FE ✅ (Profit - Taxed)

Item: Aeterna Key Fleeting  
Before: 20   After: 0     Change: -20   Price: 0.6 FE   Net: -12 FE ❌ (Cost - No Tax)

Item: Flame Elementium
Before: 100  After: 250   Change: +150  Price: 1 FE     Net: +150 FE 💎 (No Tax - Base Currency)
```

### **Keyboard Shortcuts**
- `Space` - Start/Stop timer
- `R` - Reset timer
- `Tab` - Navigate between input fields

## 📈 What It Calculates

- **Revenue (post-tax)**: Total item value minus auction house tax
- **AH Tax**: 1/8 of taxable revenue (excludes Flame Elementium)
- **Total Cost**: Sum of all negative changes (items consumed/lost)
- **Net Profit**: Revenue minus costs
- **Profit/Hour**: Your actual farming efficiency

## 🛠️ Technical Details

- **Pure HTML/CSS/JavaScript** - No frameworks, fast loading
- **Single File Application** - Easy to host anywhere
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Local Storage** - Data persists between sessions
- **Dark Gaming Theme** - Easy on the eyes during long sessions

## 📱 Mobile Friendly

Fully responsive design works great on mobile devices for quick inventory updates during farming sessions.

## 🔄 Data Export Options

### **Inventory Only**
Export just your item tracking data for sharing loadouts or strategies.

### **Results & Timer**
Export session results with timing data and calculated metrics for record keeping.

### **Full Export**
Complete backup including all data, timer state, and settings.

## 🎯 Perfect For

- **Route Optimization**: Compare profitability of different farming locations
- **Strategy Testing**: Track efficiency of various farming methods  
- **Progress Tracking**: Monitor long-term farming performance
- **Investment Planning**: Calculate ROI on farming consumables
- **Guild Sharing**: Export and share profitable strategies

## 🚀 Quick Start

1. **Download** `calculator.html`
2. **Open** in any modern web browser
3. **Start Timer** and begin tracking
4. **Add Items** with before/after quantities
5. **Watch** your profit/hour update automatically

## 📊 Item Database

Includes current market prices for:
- **Embers & Fossils** (Precious, Ultimate, Truth, Sacred, etc.)
- **Divinity Pacts** (All classes and rarities)
- **Compass Items** (200+ variants including artifacts)
- **Tokens & Wedges** (Energy, Fate, Corrosion, Priceless, etc.)
- **Beacons & Keys** (All tiers and types)
- **Special Items** (Twin Reflection, Eternity, etc.)
- **And many more!**

## 🔧 Deployment

### **GitHub Pages**
1. Create a new repository
2. Upload `calculator.html`
3. Enable GitHub Pages in settings
4. Access at `https://yourusername.github.io/repository-name/calculator.html`

### **Local Hosting**
```bash
# Python
python -m http.server 8000

# Node.js
npx serve .

# Or just open calculator.html directly in your browser
```

## 🤝 Contributing

Found outdated prices? Want to add new items? 

1. **Issues**: Report price updates or bugs
2. **Pull Requests**: Submit improvements
3. **Suggestions**: Propose new features

## 📄 License

Open source under the MIT License. Free to use, modify, and distribute.

---

**Happy Farming!** 🎮⚡

*Track smarter, farm better, profit more.*
