# GitHub Repository Explorer

A React application that allows users to search and explore GitHub repositories by username. Features include repository listing, sorting by stars, detailed repository views with contributor information, dark mode, and client-side caching for optimized performance.

## Features

- **Search by GitHub Username**: Easily find repositories for any GitHub user
- **Repository Listing**: View repository name, description, star count, and programming language
- **Sort Repositories**: Toggle sorting by star count (ascending/descending)
- **Repository Details**: Click on a repository to view detailed information including:
 - Repository name, description, language, stars, and last updated date
 - "View on GitHub" link to the repository
 - Top contributors with avatars, usernames, and commit counts
- **Performance Optimizations**:
 - Client-side caching using localStorage to avoid redundant API calls
 - Back button support to restore previous search results
- **Dark Mode**: Toggle between light and dark themes for better user experience

## Technologies Used

- React.js
- React Router for navigation
- SCSS for styling with modular structure
- Axios for API requests
- GitHub REST API for data fetching
- LocalStorage API for client-side caching

## Setup and Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/github-repo-explorer.git
cd github-repo-explorer
```
2. Install dependencies:
```bash
npm install
```
3. Create a .env file in the root directory with the following content:
```bash
VITE_GITHUB_API_BASE_URL=https://api.github.com
```
4. Start the development server:
```bash
npm run dev
```
5. Open your browser and navigate to http://localhost:5173 to view the application
Build for Production
To build the application for production:
```bash
npm run build
```

project structure:
/src
  /assets
    /styles
      /basics
        _base.scss
      /setups
        _variables.scss
      /components
        _App.scss
        _SearchBar.scss
        _RepositoryList.scss
        _RepositoryItem.scss
        _RepositoryDetails.scss
        /layout
          _Header.scss
      main.scss
  /components
    Header.jsx
    SearchBar.jsx
    RepositoryList.jsx
    RepositoryItem.jsx
  /context
    ThemeContext.jsx
  /pages
    Home.jsx
    RepositoryDetails.jsx
  /services
    github.service.js
  /utils
    cache.utils.js
  App.jsx
  main.jsx
  
Usage

Enter a GitHub username in the search bar (e.g., facebook, vercel, microsoft)
Browse through the list of repositories
Use the "Sort by Stars" button to sort repositories by star count
Click on any repository card to view detailed information and top contributors
Use the back button to return to your search results
Toggle dark mode using the icon in the header

Note
This application has rate limiting from the GitHub API. If you encounter a rate limit error, try again after some time or consider using a GitHub Personal Access Token for increased limits.
