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

export async function getGithubProfile(username: string) {
    try {
        const [userRes, reposRes] = await Promise.all([
            fetch(`https://api.github.com/users/${username}`, {
                next: { revalidate: 3600 },
            }),
            fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=9&type=owner`, {
                next: { revalidate: 3600 },
            }),
        ]);

        if (!userRes.ok || !reposRes.ok) {
            throw new Error('Failed to fetch GitHub data');
        }

        const user: GithubUser = await userRes.json();
        const repos: GithubRepo[] = await reposRes.json();

        return { user, repos };
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
        };
    }
} 