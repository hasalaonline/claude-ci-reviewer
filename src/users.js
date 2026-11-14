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

// Used by the new team directory page
export function listUsers() {
  return users.map(publicProfile);
}

export function findUserByEmail(email) {
  const user = users.find((u) => u.email === email);
  return user ? publicProfile(user) : null;
}
