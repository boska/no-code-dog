import { Octokit } from '@octokit/rest';

export interface GithubRepo {
    name: string;
    full_name: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    html_url: string;
    homepage: string | null;
    topics: string[];
    created_at: string;
    updated_at: string;
    pushed_at: string;
    size: number;
    watchers_count: number;
    default_branch: string;
    open_issues_count: number;
    has_wiki: boolean;
    visibility: string;
    license: {
        key: string;
        name: string;
        url: string;
    } | null;
}

export interface GithubUser {
    login: string;
    public_repos: number;
    followers: number;
    following: number;
    avatar_url: string;
    bio: string | null;
    blog: string | null;
    company: string | null;
    location: string | null;
    twitter_username: string | null;
    public_gists: number;
    created_at: string;
    updated_at: string;
    name: string | null;
    email: string | null;
    hireable: boolean | null;
    html_url: string;
}

export interface GithubData {
    user: GithubUser;
    repos: GithubRepo[];
}

interface CacheData {
    data: GithubData;
    timestamp: number;
}

const CACHE_KEY = 'github-profile-cache';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

const isClient = typeof window !== 'undefined';
const isProd = process.env.NODE_ENV === 'production';

function getCachedData(): CacheData | null {
    if (!isClient || !isProd) return null;

    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return null;

        const parsedCache = JSON.parse(cached) as CacheData;
        if (Date.now() - parsedCache.timestamp > CACHE_TTL) return null;

        return parsedCache;
    } catch {
        return null;
    }
}

function setCacheData(data: GithubData) {
    if (!isClient || !isProd) return;

    try {
        const cacheData: CacheData = {
            data,
            timestamp: Date.now()
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
        console.error('Cache write error:', error);
    }
}

export async function getGithubProfile(username: string): Promise<GithubData> {
    // Only check cache in production
    if (isProd) {
        const cached = getCachedData();
        if (cached) {
            return cached.data;
        }
    }

    console.log('Fetching GitHub profile for', username);

    const octokit = new Octokit();

    try {
        const [userRes, reposRes] = await Promise.all([
            octokit.rest.users.getByUsername({ username }),
            octokit.rest.repos.listForUser({ username, sort: 'updated' })
        ]);

        const data = {
            user: userRes.data as GithubUser,
            repos: reposRes.data as GithubRepo[]
        };

        // Only cache in production
        if (isProd) {
            setCacheData(data);
        }

        return data;
    } catch (error) {
        console.error('GitHub API Error:', error);
        // Try to use expired cache in production if API fails
        if (isProd && isClient) {
            const expiredCache = localStorage.getItem(CACHE_KEY);
            if (expiredCache) {
                return (JSON.parse(expiredCache) as CacheData).data;
            }
        }

        return {
            user: {
                login: '',
                public_repos: 0,
                followers: 0,
                following: 0,
                avatar_url: '',
                bio: 'Unable to load GitHub profile',
                blog: null,
                company: null,
                location: null,
                twitter_username: null,
                public_gists: 0,
                created_at: '',
                updated_at: '',
                name: null,
                email: null,
                hireable: null,
                html_url: '',
            },
            repos: []
        };
    }
} 