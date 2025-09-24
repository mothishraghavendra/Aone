// Define user types based on username patterns or prefixes
export const USER_PATTERNS = {
  PRINCIPAL: ['principal', 'dean', 'director'],
  WARDEN: ['warden', 'hostelwarden'],
  FACULTY: ['faculty', 'teacher', 'prof'],
  HOSTEL_INCHARGE: ['incharge', 'hostel'],
  STUDENT: ['std', 'student']
};

// Function to determine role from username
export const determineUserRole = (username) => {
  const lowerUsername = username.toLowerCase();
  
  // Check for exact matches first
  if (lowerUsername === 'principal') return 'PRINCIPAL';
  if (lowerUsername === 'warden') return 'WARDEN';
  
  // Check for patterns
  for (const [role, patterns] of Object.entries(USER_PATTERNS)) {
    if (patterns.some(pattern => lowerUsername.includes(pattern))) {
      return role;
    }
  }
  
  // Default role if no patterns match
  return 'STUDENT';
};

// Function to get landing page based on role
export const getRoleLandingPage = (role) => {
  switch (role) {
    case 'PRINCIPAL':
      return '/dashboard/principal';
    case 'WARDEN':
      return '/hostel';
    case 'FACULTY':
      return '/dashboard/faculty';
    case 'HOSTEL_INCHARGE':
      return '/hostel';
    case 'STUDENT':
      return '/dashboard/student';
    default:
      return '/';
  }
};