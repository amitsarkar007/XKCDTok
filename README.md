# XKCD Tok

A TikTok-style interface for browsing XKCD comics. Built with vanilla JavaScript and CSS, this web application allows you to scroll through random XKCD comics in a vertical feed, similar to TikTok's interface.

## Features

- 📱 TikTok-style vertical scrolling interface
- 🔄 Infinite scroll with random comic loading
- 📅 Clean date display with month names
- 📖 Comic metadata display (number, title, date)
- 🖼️ Responsive image scaling
- 📱 Mobile-friendly design
- ⚡ No dependencies - pure JavaScript and CSS
- 🔍 Smart preloading of comics
- 🎯 Snap scrolling for smooth navigation

## How to Use

1. Download the three files:
   - `index.html`
   - `styles.css`
   - `script.js`

2. Place all files in the same directory

3. Open `index.html` in your web browser
   - No server required!
   - No build process needed!
   - Works right out of the box

4. Start scrolling to see random XKCD comics
   - Scroll down to load more comics
   - Each comic shows its number, title, and publication date
   - Images automatically scale to fit your screen

## Technical Details

### Structure

- `index.html`: Basic HTML structure and file references
- `styles.css`: All styling including layout and animations
- `script.js`: Core functionality and comic loading logic

### Features Implementation

- **Infinite Scrolling**: Automatically loads more comics as you near the bottom of the feed
- **Smart Loading**: Prevents duplicate comics and manages loading states
- **Error Handling**: Gracefully handles network issues and API errors
- **Responsive Design**: Works on any screen size
- **Snap Scrolling**: Ensures comics align perfectly with your viewport

### API Usage

Uses the XKCD JSON API with the following endpoints:
- `https://xkcd.com/info.0.json` - Get latest comic info
- `https://xkcd.com/{num}/info.0.json` - Get specific comic by number

## Credits

- Comics from [XKCD](https://xkcd.com)
- Inspired by [WikiTok](https://github.com/IsaacGemal/wikitok)

## License

MIT License - Feel free to use, modify, and distribute as you wish! 