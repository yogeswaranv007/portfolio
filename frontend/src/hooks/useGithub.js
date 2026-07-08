import { useState, useEffect, useCallback } from 'react';
import { githubService } from '../services/githubService';

export function useGithub() {
  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [pinnedRepos, setPinnedRepos] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [activity, setActivity] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Execute all requests concurrently for better performance
      const [
        profileData,
        reposData,
        pinnedData,
        statsData,
        langsData,
        activityData
      ] = await Promise.all([
        githubService.getProfile(),
        githubService.getRepositories(),
        githubService.getPinnedRepositories(),
        githubService.getStatistics(),
        githubService.getLanguages(),
        githubService.getActivity()
      ]);

      setProfile(profileData);
      setRepositories(reposData);
      setPinnedRepos(pinnedData);
      setStatistics(statsData);
      setLanguages(langsData);
      setActivity(activityData);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch GitHub data. Backend might be down.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return {
    profile,
    repositories,
    pinnedRepos,
    statistics,
    languages,
    activity,
    loading,
    error,
    retry: fetchAllData
  };
}
