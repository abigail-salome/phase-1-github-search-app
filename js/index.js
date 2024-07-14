document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const userList = document.getElementById('user-list');
    const repoList = document.getElementById('repo-list');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value;
        searchGitHubUsers(query);
    });

    function searchGitHubUsers(query) {
        fetch(`https://api.github.com/search/users?q=${query}`)
            .then(response => response.json())
            .then(data => {
                displayUsers(data.items);
            });
    }

    function displayUsers(users) {
        userList.innerHTML = '';
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            userCard.innerHTML = `
                <img src="${user.avatar_url}" alt="${user.login}">
                <h2>${user.login}</h2>
                <a href="${user.html_url}" target="_blank">View Profile</a>
            `;
            userCard.addEventListener('click', () => {
                fetchUserRepos(user.login);
            });
            userList.appendChild(userCard);
        });
    }

    function fetchUserRepos(username) {
        fetch(`https://api.github.com/users/${username}/repos`)
            .then(response => response.json())
            .then(data => {
                displayRepos(data);
            });
    }

    function displayRepos(repos) {
        repoList.innerHTML = '';
        const repoListContainer = document.createElement('div');
        repoListContainer.className = 'repo-list';
        repos.forEach(repo => {
            const repoItem = document.createElement('div');
            repoItem.className = 'repo-item';
            repoItem.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || 'No description available'}</p>
                <a href="${repo.html_url}" target="_blank">View Repository</a>
            `;
            repoListContainer.appendChild(repoItem);
        });
        repoList.appendChild(repoListContainer);
    }
});
