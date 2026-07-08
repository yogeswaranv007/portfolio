import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch, FaCircle } from 'react-icons/fa';
import { AlertCircle, RefreshCw, Search } from 'lucide-react';
import { useGithub } from '../hooks/useGithub';

export default function GithubDashboardView() {
  const { profile, repositories, pinnedRepos, statistics, languages, activity, loading, error, retry } = useGithub();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  // Filter repositories based on search and language
  const filteredRepos = useMemo(() => {
    if (!repositories) return [];
    return repositories.filter(repo => {
      const matchesSearch = repo.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesLanguage = selectedLanguage === 'All' || repo.language === selectedLanguage;
      return matchesSearch && matchesLanguage;
    });
  }, [repositories, searchQuery, selectedLanguage]);

  if (loading) {
    return <GithubSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <h2 className="text-xl font-bold text-text">Failed to load GitHub data</h2>
        <p className="text-text/70 max-w-md">{error}</p>
        <button onClick={retry} className="flex items-center gap-2 px-6 py-2 bg-cards border border-borders hover:border-primary text-text rounded-lg transition-colors mt-4">
          <RefreshCw className="w-4 h-4" /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-6">
          <img src={profile?.avatarUrl} alt="GitHub Avatar" className="w-20 h-20 rounded-full border-2 border-primary/20" />
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-text flex items-center gap-3">
              {profile?.name || profile?.login}
              <a href={profile?.htmlUrl} target="_blank" rel="noreferrer" className="text-text/50 hover:text-primary transition-colors">
                <FaGithub className="w-6 h-6" />
              </a>
            </h1>
            <p className="text-text/70 mt-1 max-w-lg">{profile?.bio}</p>
            <div className="flex gap-4 mt-2 text-sm text-text/60">
              <span><strong className="text-text">{profile?.followers}</strong> followers</span>
              <span><strong className="text-text">{profile?.following}</strong> following</span>
              <span><strong className="text-text">{profile?.publicRepos}</strong> repos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Repositories', value: statistics?.totalRepositories },
          { label: 'Total Stars', value: statistics?.totalStars },
          { label: 'Total Forks', value: statistics?.totalForks },
          { label: 'Top Language', value: languages?.[0]?.name || 'N/A' },
        ].map((stat, idx) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-6 flex flex-col items-center justify-center text-center gap-2"
          >
            <span className="text-3xl font-bold text-primary">{stat.value}</span>
            <span className="text-xs uppercase tracking-wider font-semibold text-text/60">{stat.label}</span>
          </motion.div>
        ))}
      </section>

      {/* Pinned / Featured Repositories */}
      {pinnedRepos.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-text flex items-center gap-2">
            <FaStar className="w-5 h-5 text-yellow-500" /> Featured Repositories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pinnedRepos.map((repo, idx) => (
              <RepoCard key={repo.name} repo={repo} idx={idx} featured />
            ))}
          </div>
        </section>
      )}

      {/* Main Repository Gallery & Activity Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Repository Gallery */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-text">All Repositories</h2>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-48">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text/50" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-background border border-borders rounded-lg text-sm text-text focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <select 
                value={selectedLanguage} 
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-background border border-borders rounded-lg text-sm text-text px-3 py-2 focus:outline-none focus:border-primary transition-colors"
              >
                <option value="All">All Languages</option>
                {languages.map(lang => (
                  <option key={lang.name} value={lang.name}>{lang.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredRepos.length > 0 ? (
              filteredRepos.map(repo => (
                <RepoCard key={repo.id} repo={repo} />
              ))
            ) : (
              <p className="text-text/50 text-center py-8 bg-cards border border-borders/50 rounded-xl">No repositories match your criteria.</p>
            )}
          </div>
        </div>

        {/* Right Column: Activity Timeline */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-text">Recent Activity</h2>
          <div className="glass-card p-6 relative">
            <div className="absolute left-6 top-6 bottom-6 w-px bg-borders"></div>
            <div className="space-y-6 relative">
              {activity.map((item, idx) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="pl-6 relative"
                >
                  <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-primary ring-4 ring-cards"></div>
                  <p className="text-sm font-semibold text-text">{item.type.replace('Event', '')}</p>
                  <p className="text-xs text-text/60 mt-0.5">{item.repoName}</p>
                  <p className="text-xs text-text/40 mt-1">{new Date(item.createdAt).toLocaleDateString()}</p>
                </motion.div>
              ))}
              {activity.length === 0 && <p className="text-sm text-text/50">No recent public activity found.</p>}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Sub-component for rendering a repository card
function RepoCard({ repo, featured = false, idx = 0 }) {
  return (
    <motion.a 
      href={repo.htmlUrl} 
      target="_blank" 
      rel="noreferrer"
      initial={featured ? { opacity: 0, scale: 0.95 } : { opacity: 0, y: 10 }}
      animate={featured ? { opacity: 1, scale: 1 } : { opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1 }}
      className={`block p-5 glass-card hover:border-primary/50 transition-colors group ${featured ? 'h-full flex flex-col justify-between' : ''}`}
    >
      <div>
        <h3 className="text-lg font-bold text-text group-hover:text-primary transition-colors line-clamp-1">{repo.name}</h3>
        <p className="text-sm text-text/60 mt-2 line-clamp-2 min-h-[40px]">{repo.description || "No description provided."}</p>
      </div>
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-borders/50 text-xs text-text/70">
        <span className="flex items-center gap-1.5">
          <FaCircle className="w-2.5 h-2.5 text-primary" /> {repo.language}
        </span>
        <span className="flex items-center gap-1.5 hover:text-yellow-500 transition-colors">
          <FaStar className="w-3.5 h-3.5" /> {repo.stargazersCount}
        </span>
        <span className="flex items-center gap-1.5">
          <FaCodeBranch className="w-3 h-3" /> {repo.forksCount}
        </span>
      </div>
    </motion.a>
  );
}

// Sub-component for skeleton loading state
function GithubSkeleton() {
  return (
    <div className="space-y-12 pb-20 max-w-6xl mx-auto animate-pulse">
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-cards border border-borders"></div>
        <div className="space-y-3 flex-1">
          <div className="h-8 bg-cards rounded w-48"></div>
          <div className="h-4 bg-cards rounded w-96"></div>
          <div className="h-4 bg-cards rounded w-64"></div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-28 bg-cards rounded-xl"></div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="h-8 bg-cards rounded w-48 mb-6"></div>
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-cards rounded-xl"></div>
          ))}
        </div>
        <div className="space-y-4">
          <div className="h-8 bg-cards rounded w-48 mb-6"></div>
          <div className="h-[400px] bg-cards rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
