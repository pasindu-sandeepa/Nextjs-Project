import ky from 'ky';

const loginUser = async ({ email, password }) => {
  const response = await fetch("http://localhost:3000/api/v1/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

const registerUser = async ({ name, email, password }) => {
  const response = await fetch("http://localhost:3000/api/v1/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
  return response.json();
};

export { loginUser, registerUser };

export const getMovies = async () => {
  try {
    const response = await ky.get("http://localhost:3000/api/v1/movies", {
      cache: "no-cache",
    });
    if (response.ok) {
      return response.json();
    } else {
      return { error: true, message: "Failed to fetch movies" };
    }
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const responseBody = await error.response.json();
      console.log("HTTP Error", status, responseBody);
    } else {
      console.log("Unknown Error", error.message);
    }
    return { error: true, message: "An error occurred while fetching movies" };
  }
};