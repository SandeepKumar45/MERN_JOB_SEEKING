import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api/v1/user': 'https://mern-job-seeking-ngkz.onrender.com',
      '/api/v1/application': 'https://mern-job-seeking-ngkz.onrender.com',
      '/api/v1/job': 'https://mern-job-seeking-ngkz.onrender.com',
    }
  }
})
