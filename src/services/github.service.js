// src/services/github.service.js
import axios from 'axios';
import { getCachedData, setCachedData } from '../utils/cache.utils';

const API_BASE_URL = import.meta.env.VITE_GITHUB_API_BASE_URL;

// Function to fetch repositories for a username
export const fetchRepositoriesByUsername = async (username, page = 1, perPage = 10) => {
    const cacheKey = `repos_${username}_${page}_${perPage}`;

    // Check cache first
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
        console.log('Using cached repositories data');
        return { data: cachedData, fromCache: true };
    }

    try {
        const response = await axios.get(
            `${API_BASE_URL}/users/${username}/repos?per_page=${perPage}&page=${page}`
        );

        // Cache the data
        setCachedData(cacheKey, response.data);

        return { data: response.data, fromCache: false };
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error('User not found. Please check the username and try again.');
        }
        console.error('Error fetching repositories:', error);
        throw error;
    }
};

// Function to fetch contributors for a repository
export const fetchRepositoryContributors = async (username, repoName) => {
    const cacheKey = `contributors_${username}_${repoName}`;

    // Check cache first
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
        console.log('Using cached contributors data');
        return cachedData;
    }

    try {
        const response = await axios.get(
            `${API_BASE_URL}/repos/${username}/${repoName}/contributors`
        );

        // Cache the data
        setCachedData(cacheKey, response.data);

        return response.data;
    } catch (error) {
        console.error('Error fetching contributors:', error);
        throw error;
    }
};
