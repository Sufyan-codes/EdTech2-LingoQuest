// mock auth service - replace with actual API calls later
const USER_KEY = "lingo_user";
const TOKEN_KEY = "lingo_token";

/**
 * Example avatar path (you uploaded image files to /mnt/data).
 * We'll use it in the mocked user object. You will swap this when you host assets.
 */
const MOCK_AVATAR = "/mnt/data/Profile.png"; // <-- this is the uploaded path you provided

export async function signup({ fullName, email, password }) {
  // Small delay to simulate API
  await new Promise((r) => setTimeout(r, 700));

  // Create mock token + user and store in localStorage
  const token = "mock-jwt-token-" + Date.now();
  const user = {
    id: Date.now().toString(),
    name: fullName,
    email,
    avatar: MOCK_AVATAR,
    xp: 850,
    streak: 7,
    language: "French (Beginner)"
  };

  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(TOKEN_KEY, token);

  return { success: true, token, user };
}

export async function login({ email, password }) {
  await new Promise((r) => setTimeout(r, 700));

  // In a real API you'd validate credentials. For now we accept any credentials,
  // but if you want basic check: accept only user@example.com/password
  const stored = localStorage.getItem(USER_KEY);
  let user = stored ? JSON.parse(stored) : null;

  if (!user) {
    // create a default user if none was registered yet
    user = {
      id: "1",
      name: "Demo User",
      email,
      avatar: MOCK_AVATAR,
      xp: 850,
      streak: 7,
      language: "French (Beginner)"
    };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  const token = "mock-jwt-token-" + Date.now();
  localStorage.setItem(TOKEN_KEY, token);

  return { success: true, token, user };
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function storeToken(token, remember = false) {
  if (remember) localStorage.setItem(TOKEN_KEY, token);
  else sessionStorage.setItem(TOKEN_KEY, token);
}
