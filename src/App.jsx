import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer'; 
import StatsCards from './components/StatsCards/StatsCards';
import SearchBar from './components/SearchBar/SearchBar';

function App() {
  return (
    <div>
      <Header />
      <StatsCards/>
      <SearchBar/>
<Footer />

    </div>
  );
}

export default App;