import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://acumblomcsqqdnzvgtoj.supabase.co'; // Replace with your Supabase Project URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjdW1ibG9tY3NxcWRuenZndG9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MjMyNTIsImV4cCI6MjA2MDI5OTI1Mn0.rB0iufdofpEDeqopbJGgMy5TNsfBS7zaE2EIZkHKL7Q'; // Replace with your Supabase Anon Key
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// DOM Elements
const signupForm = document.getElementById('signup');
const loginForm = document.getElementById('login');
const resetForm = document.getElementById('reset');
const signupMessage = document.getElementById('signup-message');
const loginMessage = document.getElementById('login-message');
const resetMessage = document.getElementById('reset-message');
const signupFormDiv = document.getElementById('signup-form');
const loginFormDiv = document.getElementById('login-form');
const resetFormDiv = document.getElementById('reset-form');
const showLogin = document.getElementById('show-login');
const showSignup = document.getElementById('show-signup');
const showReset = document.getElementById('show-reset');
const showLoginFromReset = document.getElementById('show-login-from-reset');

// Toggle Forms
showLogin.addEventListener('click', (e) => {
  e.preventDefault();
  signupFormDiv.style.display = 'none';
  loginFormDiv.style.display = 'block';
  resetFormDiv.style.display = 'none';
});

showSignup.addEventListener('click', (e) => {
  e.preventDefault();
  signupFormDiv.style.display = 'block';
  loginFormDiv.style.display = 'none';
  resetFormDiv.style.display = 'none';
});

showReset.addEventListener('click', (e) => {
  e.preventDefault();
  signupFormDiv.style.display = 'none';
  loginFormDiv.style.display = 'none';
  resetFormDiv.style.display = 'block';
});

showLoginFromReset.addEventListener('click', (e) => {
  e.preventDefault();
  signupFormDiv.style.display = 'none';
  loginFormDiv.style.display = 'block';
  resetFormDiv.style.display = 'none';
});

// Sign-Up
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: window.location.origin + '/welcome.html', // Optional: Redirect after email confirmation
    },
  });

  if (error) {
    signupMessage.textContent = `Error: ${error.message}`;
  } else {
    signupMessage.textContent = 'Sign-up successful! Check your email for confirmation.';
  }
});

// Sign-In
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    loginMessage.textContent = `Error: ${error.message}`;
  } else {
    loginMessage.textContent = 'Login successful!';
    window.location.href = '/dashboard.html'; // Example redirect
  }
});

// Password Reset
resetForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('reset-email').value;

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + '/update-password.html',
  });

  if (error) {
    resetMessage.textContent = `Error: ${error.message}`;
  } else {
    resetMessage.textContent = 'Password reset email sent! Check your inbox.';
  }
});