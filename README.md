# Pokedex

Pokemon Explorer is a Next.js-based web application that allows users to search for Pokémon, view their details, abilities. It utilizes the PokéAPI to fetch real-time data.

## Features
- **Search Pokémon** by name
- **View Pokémon details** including abilities, type ,category, about
- **Responsive UI** for mobile and desktop
- **Lazy loading** with a loading screen until images are fully loaded

## Tech Stack
- **Frontend:** Next.js, React, Tailwind CSS
- **API:** PokéAPI
- **State Management:** useState, useEffect

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pokemon-explorer.git
   cd pokemon-explorer
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```
   (If you don’t have `pnpm`, install it using `npm install -g pnpm`)

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Usage
This project fetches data from the [PokéAPI](https://pokeapi.co/):
- Pokémon data: `https://pokeapi.co/api/v2/pokemon/{id}`
- Evolution chain: `https://pokeapi.co/api/v2/evolution-chain/{id}`

## Project Structure
```
/src
  ├── app
  │   ├── page.tsx          # Home page with search functionality
  │   ├── pokemon
  │   │   ├── [id]
  │   │   │   ├── page.tsx  # Pokemon details page
```


## License
MIT License.

