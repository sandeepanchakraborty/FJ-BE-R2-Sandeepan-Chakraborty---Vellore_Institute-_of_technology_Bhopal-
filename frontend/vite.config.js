import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS
    ? '/FJ-BE-R2-Sandeepan-Chakraborty---Vellore_Institute-_of_technology_Bhopal-/'
    : '/',
})
