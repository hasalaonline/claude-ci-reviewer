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
  return users;
}

export function findUserByEmail(email) {
  return users.find((u) => (u.email = email)) ?? null;
}
