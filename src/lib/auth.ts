export interface LoginCredentials {
  nationalNumber: string;
  password: string;
}

export interface LoginResponse {
  sessionId: string;
  user: {
    id: string;
    name: string;
    nationalNumber: string;
  };
  expiresAt: number;
}

const users = [
  {
    id: "1",
    name: "kamel Yousef",
    nationalNumber: "1234567890",
    password: "password123",
  },
];

export function simulateLogin(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(
        (u) => u.nationalNumber === credentials.nationalNumber
      );

      if (!user) {
        reject(new Error("User not found"));
        return;
      }

      if (credentials.password !== user.password) {
        reject(new Error("Invalid password"));
        return;
      }

      const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour from now

      resolve({
        sessionId: "fake-session-id",
        user: {
          id: user.id,
          name: user.name,
          nationalNumber: user.nationalNumber,
        },
        expiresAt,
      });
    }, 1000);
  });
}

export function isSessionExpired(expiresAt: number): boolean {
  return Date.now() > expiresAt;
}
