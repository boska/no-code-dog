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

interface ContributionDay {
    date: string;
    count: number;
}

export interface GithubData {
    user: GithubUser;
    repos: GithubRepo[];
    contributions: ContributionDay[];
}

export async function getGithubProfile(username: string): Promise<GithubData> {
    const token = process.env.GITHUB_TOKEN;
    const octokit = new Octokit({ auth: token });

    try {
        const [userRes, reposRes, contributionsRes] = await Promise.all([
            octokit.rest.users.getByUsername({ username }),
            octokit.rest.repos.listForUser({ username, sort: 'updated' }),
            octokit.rest.repos.getContributorsStats({ owner: username, repo: username })
        ]);

        // Process contribution data
        const contributions = contributionsRes.data?.[0]?.weeks.map(week => ({
            date: new Date(week.w * 1000).toISOString().split('T')[0],
            count: week.c
        })) || [];

        return {
            user: userRes.data,
            repos: reposRes.data,
            contributions
        };
    } catch (error) {
        console.error('GitHub API Error:', error);
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
            repos: [],
            contributions: []
        };
    }
} 