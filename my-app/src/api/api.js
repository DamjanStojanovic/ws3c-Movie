const BASE_URL = 'https://api.themoviedb.org/3';
const OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzNjZmViODM3ZGY4NzM5ZjRhZjRlMDBjZGFlMzBjYSIsInN1YiI6IjY1MzYxZjMxMmIyMTA4MDBhZTUyZGIxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S0kcWgOPEHSXh9vNVpZninvf6yUPCupMPKOTjBSTkZg'
    }
};

export async function fetchData(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`, OPTIONS);
    const data = await response.json();
    console.log(data);
    return data;
}