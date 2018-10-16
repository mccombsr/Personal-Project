import React from 'react';
import BusinessCard from './BusinessCard/BusinessCard';
import SearchBar from './SearchBar/SearchBar';

export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <SearchBar/>
            <BusinessCard/>
        </div>
    )
}