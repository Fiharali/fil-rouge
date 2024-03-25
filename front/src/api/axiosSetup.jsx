import axios from "axios";

const axiosSetup = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/`,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data'
  },
})


// axiosSetup.interceptors.request.use(async config => {
//   try {
//       // Fetch CSRF token
//       const csrfResponse = await axiosSetup.get('/sanctum/csrf-cookie');
//       const csrfToken = csrfResponse.headers['x-csrf-token']; // Assuming the CSRF token is provided in the response headers

//       // Attach CSRF token to request headers
//       if (csrfToken) {
//           config.headers['X-CSRF-TOKEN'] = csrfToken;
//       }
//   } catch (error) {
//       console.error('Failed to fetch CSRF token:', error);
//   }

//   return config;
// });

export { axiosSetup }