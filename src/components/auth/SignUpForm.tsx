'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../utils/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Country data with phone formats - sorted alphabetically
const countries = [
  { code: 'AR', name: 'Argentina', example: '+54 9 11 2345-6789', prefix: '+54' },
  { code: 'AU', name: 'Australia', example: '+61 412 345 678', prefix: '+61' },
  { code: 'AT', name: 'Austria', example: '+43 664 1234567', prefix: '+43' },
  { code: 'BE', name: 'Belgium', example: '+32 470 12 34 56', prefix: '+32' },
  { code: 'BR', name: 'Brazil', example: '+55 11 98765-4321', prefix: '+55' },
  { code: 'CA', name: 'Canada', example: '+1 604 123 4567', prefix: '+1' },
  { code: 'CL', name: 'Chile', example: '+56 9 8765 4321', prefix: '+56' },
  { code: 'CN', name: 'China', example: '+86 139 1234 5678', prefix: '+86' },
  { code: 'CO', name: 'Colombia', example: '+57 320 123 4567', prefix: '+57' },
  { code: 'CR', name: 'Costa Rica', example: '+506 8123 4567', prefix: '+506' },
  { code: 'HR', name: 'Croatia', example: '+385 98 123 4567', prefix: '+385' },
  { code: 'CZ', name: 'Czech Republic', example: '+420 601 123 456', prefix: '+420' },
  { code: 'DK', name: 'Denmark', example: '+45 20 12 34 56', prefix: '+45' },
  { code: 'EG', name: 'Egypt', example: '+20 10 1234 5678', prefix: '+20' },
  { code: 'FI', name: 'Finland', example: '+358 40 123 4567', prefix: '+358' },
  { code: 'FR', name: 'France', example: '+33 6 12 34 56 78', prefix: '+33' },
  { code: 'DE', name: 'Germany', example: '+49 170 123 4567', prefix: '+49' },
  { code: 'GR', name: 'Greece', example: '+30 697 1234 567', prefix: '+30' },
  { code: 'HK', name: 'Hong Kong', example: '+852 9123 4567', prefix: '+852' },
  { code: 'HU', name: 'Hungary', example: '+36 30 123 4567', prefix: '+36' },
  { code: 'IS', name: 'Iceland', example: '+354 661 2345', prefix: '+354' },
  { code: 'IN', name: 'India', example: '+91 98765 43210', prefix: '+91' },
  { code: 'ID', name: 'Indonesia', example: '+62 812 3456 7890', prefix: '+62' },
  { code: 'IE', name: 'Ireland', example: '+353 85 123 4567', prefix: '+353' },
  { code: 'IL', name: 'Israel', example: '+972 52 123 4567', prefix: '+972' },
  { code: 'IT', name: 'Italy', example: '+39 345 123 4567', prefix: '+39' },
  { code: 'JP', name: 'Japan', example: '+81 90 1234 5678', prefix: '+81' },
  { code: 'KR', name: 'South Korea', example: '+82 10 1234 5678', prefix: '+82' },
  { code: 'MY', name: 'Malaysia', example: '+60 12 345 6789', prefix: '+60' },
  { code: 'MX', name: 'Mexico', example: '+52 1 55 1234 5678', prefix: '+52' },
  { code: 'NL', name: 'Netherlands', example: '+31 6 12345678', prefix: '+31' },
  { code: 'NZ', name: 'New Zealand', example: '+64 21 123 456', prefix: '+64' },
  { code: 'NO', name: 'Norway', example: '+47 411 23 456', prefix: '+47' },
  { code: 'PK', name: 'Pakistan', example: '+92 301 2345678', prefix: '+92' },
  { code: 'PH', name: 'Philippines', example: '+63 917 123 4567', prefix: '+63' },
  { code: 'PL', name: 'Poland', example: '+48 512 345 678', prefix: '+48' },
  { code: 'PT', name: 'Portugal', example: '+351 912 345 678', prefix: '+351' },
  { code: 'RO', name: 'Romania', example: '+40 712 345 678', prefix: '+40' },
  { code: 'RU', name: 'Russia', example: '+7 912 345 67 89', prefix: '+7' },
  { code: 'SA', name: 'Saudi Arabia', example: '+966 55 123 4567', prefix: '+966' },
  { code: 'SG', name: 'Singapore', example: '+65 9123 4567', prefix: '+65' },
  { code: 'ZA', name: 'South Africa', example: '+27 71 123 4567', prefix: '+27' },
  { code: 'ES', name: 'Spain', example: '+34 612 345 678', prefix: '+34' },
  { code: 'SE', name: 'Sweden', example: '+46 70 123 45 67', prefix: '+46' },
  { code: 'CH', name: 'Switzerland', example: '+41 78 123 45 67', prefix: '+41' },
  { code: 'TW', name: 'Taiwan', example: '+886 912 345 678', prefix: '+886' },
  { code: 'TH', name: 'Thailand', example: '+66 81 234 5678', prefix: '+66' },
  { code: 'TR', name: 'Turkey', example: '+90 532 123 45 67', prefix: '+90' },
  { code: 'UA', name: 'Ukraine', example: '+380 50 123 4567', prefix: '+380' },
  { code: 'AE', name: 'United Arab Emirates', example: '+971 50 123 4567', prefix: '+971' },
  { code: 'GB', name: 'United Kingdom', example: '+44 7911 123456', prefix: '+44' },
  { code: 'US', name: 'United States', example: '+1 212 555 1234', prefix: '+1' },
  { code: 'VN', name: 'Vietnam', example: '+84 91 234 56 78', prefix: '+84' },
];

// Add a local implementation of checkExistingUser since it's not in the AuthContext
const checkExistingUser = async (email: string, phone: string, username: string) => {
  // Mock implementation - in a real app, this would check with Supabase
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
  return {
    exists: false,
    message: null
  };
};

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [validating, setValidating] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const { signUp, uploadAvatar } = useAuth();
  const router = useRouter();
  
  // Refs for debounce timers and file input
  const emailDebounceTimer = useRef<NodeJS.Timeout | null>(null);
  const phoneDebounceTimer = useRef<NodeJS.Timeout | null>(null);
  const usernameDebounceTimer = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredCountries = searchTerm 
    ? countries.filter(country => 
        country.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : countries;

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = e.target.value;
    const country = countries.find(c => c.code === countryCode) || countries[0];
    setSelectedCountry(country);
    
    // Update phone field with new prefix if it's empty or just contains a prefix
    if (!phone || countries.some(c => phone === c.prefix)) {
      setPhone(country.prefix);
    }
  };
  
  // Handle profile picture selection
  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    const fileSizeInMB = file.size / (1024 * 1024);
    
    // Validate file size (2MB max)
    if (fileSizeInMB > 2) {
      setError('Image too large. Please select an image under 2MB.');
      return;
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }
    
    setProfilePicture(file);
    
    // Create a preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  // Trigger file input click
  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };
  
  // Validate username format
  const validateUsername = (username: string): boolean => {
    if (!username) return false;
    
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
      setUsernameError('Username must be 3-20 characters and can only contain letters, numbers, and underscores.');
      return false;
    }
    
    return true;
  };
  
  // Validate email and phone with debounce
  useEffect(() => {
    // Clear previous timer
    if (emailDebounceTimer.current) {
      clearTimeout(emailDebounceTimer.current);
    }
    
    if (email && email.includes('@')) {
      setValidating(true);
      // Set new timer
      emailDebounceTimer.current = setTimeout(async () => {
        const { exists, message } = await checkExistingUser(email, '', '');
        if (exists) {
          setEmailError(message);
        } else {
          setEmailError(null);
        }
        setValidating(false);
      }, 500);
    }
    
    return () => {
      if (emailDebounceTimer.current) {
        clearTimeout(emailDebounceTimer.current);
      }
    };
  }, [email, checkExistingUser]);
  
  useEffect(() => {
    // Clear previous timer
    if (phoneDebounceTimer.current) {
      clearTimeout(phoneDebounceTimer.current);
    }
    
    // Set new timer
    if (phone && phone.length > 10) {
      setValidating(true);
      phoneDebounceTimer.current = setTimeout(async () => {
        const { exists, message } = await checkExistingUser('', phone, '');
        if (exists) {
          setPhoneError(message);
        } else {
          setPhoneError(null);
        }
        setValidating(false);
      }, 500);
    }
    
    return () => {
      if (phoneDebounceTimer.current) {
        clearTimeout(phoneDebounceTimer.current);
      }
    };
  }, [phone, checkExistingUser]);
  
  // Check for username availability
  useEffect(() => {
    // Clear previous timer
    if (usernameDebounceTimer.current) {
      clearTimeout(usernameDebounceTimer.current);
    }
    
    if (username && validateUsername(username)) {
      setValidating(true);
      // Set new timer
      usernameDebounceTimer.current = setTimeout(async () => {
        const { exists, message } = await checkExistingUser('', '', username);
        if (exists) {
          setUsernameError(message);
        } else {
          setUsernameError(null);
        }
        setValidating(false);
      }, 500);
    }
    
    return () => {
      if (usernameDebounceTimer.current) {
        clearTimeout(usernameDebounceTimer.current);
      }
    };
  }, [username, checkExistingUser]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setError(null);
    setMessage(null);
    
    // Validate form
    if (!email || !password || !phone || !username || !displayName || !profilePicture) {
      setError('All fields are required');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    // Basic phone validation
    const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/;
    if (!phoneRegex.test(phone)) {
      setError('Please enter a valid phone number');
      return;
    }
    
    // Username validation
    if (!validateUsername(username)) {
      setError('Username must be 3-20 characters and can only contain letters, numbers, and underscores.');
      return;
    }
    
    // Check if there are validation errors
    if (emailError || phoneError || usernameError) {
      setError(emailError || phoneError || usernameError || 'Please fix validation errors before submitting');
      return;
    }
    
    try {
      setLoading(true);
      
      // One final check before submitting
      const { exists, message } = await checkExistingUser(email, phone, username);
      if (exists) {
        setError(message || 'User with this email, phone, or username already exists');
        setLoading(false);
        return;
      }
      
      // Register the user
      const { error: signUpError, data } = await signUp(email, password, phone, username, displayName);
      
      if (signUpError) {
        throw new Error(signUpError.message);
      }
      
      // Upload profile picture if registration was successful
      if (data && data.user && profilePicture) {
        const { error: uploadError } = await uploadAvatar(profilePicture, data.user.id);
        
        if (uploadError) {
          console.error('Error uploading profile picture:', uploadError);
          // Continue since the user account was created successfully
        }
      }
      
      setMessage('Check your email for the confirmation link!');
      
      // Clear form
      setEmail('');
      setPhone('');
      setUsername('');
      setDisplayName('');
      setPassword('');
      setConfirmPassword('');
      setProfilePicture(null);
      setPreviewUrl(null);
      setSelectedCountry(countries[0]);
      setSearchTerm('');
      setEmailError(null);
      setPhoneError(null);
      setUsernameError(null);
    } catch (error: any) {
      setError(error.message || 'An error occurred during sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Create an Account</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {message && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {message}
        </div>
      )}
      
      <form onSubmit={handleSignUp}>
        {/* Profile Picture Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Profile Picture <span className="text-red-500">*</span>
          </label>
          <div 
            onClick={handleProfilePictureClick}
            className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden cursor-pointer border-4 border-indigo-500 hover:opacity-90 transition-opacity"
          >
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Profile preview"
                fill
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-200 dark:bg-gray-700">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
            )}
            
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
              <span className="text-white font-semibold text-sm">
                {previewUrl ? 'Change photo' : 'Upload photo'}
              </span>
            </div>
          </div>
          
          <input 
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="hidden"
            required
          />
          
          <div className="text-sm text-center text-gray-500 dark:text-gray-400">
            Click to upload a profile picture (max 2MB)
          </div>
        </div>
      
        {/* Username and Display Name */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Username <span className="text-red-500">*</span>
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a unique username"
            className={`w-full px-3 py-2 border ${usernameError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            required
          />
          {usernameError ? (
            <p className="mt-1 text-xs text-red-500">{usernameError}</p>
          ) : (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              3-20 characters, letters, numbers, and underscores only
            </p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Display Name <span className="text-red-500">*</span>
          </label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Enter your preferred display name"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            This is how your name will appear to others
          </p>
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-3 py-2 border ${emailError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            required
          />
          {emailError && (
            <p className="mt-1 text-xs text-red-500">{emailError}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Country <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 mb-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <select
              id="country"
              value={selectedCountry.code}
              onChange={handleCountryChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              {filteredCountries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name} ({country.prefix})
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={selectedCountry.example}
            className={`w-full px-3 py-2 border ${phoneError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            required
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Format: {selectedCountry.example}
          </p>
          {phoneError && (
            <p className="mt-1 text-xs text-red-500">{phoneError}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Must be at least 6 characters
          </p>
        </div>
        
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        
        <div>
          <button
            type="submit"
            disabled={loading || validating || !!emailError || !!phoneError || !!usernameError}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Signing up...' : validating ? 'Validating...' : 'Sign up'}
          </button>
        </div>
      </form>
    </div>
  );
} 