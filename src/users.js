const users = [
  { id: 1, name: "Ada", email: "ada@example.com", role: "admin" },
  { id: 2, name: "Linus", email: "linus@example.com", role: "member" },
];

export function findUser(id) {
  return users.find((u) => u.id === id) ?? null;
}

export function publicProfile(user) {
  return { id: user.id, name: user.name };
}

// Used by the new /api/users/search endpoint
export function searchUsers(query) {
  if (typeof query !== "string" || query.trim() === "") return [];
  const q = query.trim().toLowerCase();
  return users
    .filter((u) => u.name.toLowerCase().includes(q))
    .map(publicProfile);
}
