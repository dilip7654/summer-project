export const fetchRepos = async (username) => {
  const response = await fetch(`https://api.github.com/users/${username}/repos`);
  return await response.json();
};
