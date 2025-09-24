// Menu configurations for different roles
export const getMenuItems = (role) => {
  switch (role) {
    case 'admin':
      return [
        {
          text: 'Dashboard',
          icon: 'dashboard',
          path: '/admin/dashboard'
        },
        {
          text: 'Manage Students',
          icon: 'people',
          path: '/admin/students'
        },
        {
          text: 'Manage Staff',
          icon: 'group',
          path: '/admin/staff'
        },
        {
          text: 'Academic Settings',
          icon: 'school',
          path: '/admin/academics'
        }
      ];

    case 'principal':
      return [
        {
          text: 'Dashboard',
          icon: 'dashboard',
          path: '/principal/dashboard'
        },
        {
          text: 'View Students',
          icon: 'people',
          path: '/principal/students'
        },
        {
          text: 'Academic Reports',
          icon: 'assessment',
          path: '/principal/reports'
        }
      ];

    case 'warden':
      return [
        {
          text: 'Dashboard',
          icon: 'dashboard',
          path: '/warden/dashboard'
        },
        {
          text: 'Hostel Students',
          icon: 'people',
          path: '/warden/students'
        },
        {
          text: 'Room Allocation',
          icon: 'meeting_room',
          path: '/warden/rooms'
        },
        {
          text: 'Mess Management',
          icon: 'restaurant',
          path: '/warden/mess'
        }
      ];

    case 'student':
      return [
        {
          text: 'Dashboard',
          icon: 'dashboard',
          path: '/student/dashboard'
        },
        {
          text: 'Attendance',
          icon: 'event',
          path: '/student/attendance'
        },
        {
          text: 'Grades',
          icon: 'grade',
          path: '/student/grades'
        },
        {
          text: 'Hostel',
          icon: 'home',
          path: '/student/hostel'
        }
      ];

    default:
      return [];
  }
};