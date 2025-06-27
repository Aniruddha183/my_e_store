# Authentication System Guide

This guide explains how the authentication system works in your Next.js application and how to use it to protect pages and components.

## 🚀 Features

- ✅ **Automatic Login Popup**: Shows a beautiful login modal when users try to access protected pages
- ✅ **Global Authentication State**: Manages auth state across the entire application
- ✅ **Persistent Login**: Tokens are stored in localStorage and persist across page refreshes
- ✅ **Multiple Protection Methods**: Choose between popup or redirect for authentication
- ✅ **FakeStore API Integration**: Uses the FakeStore API for demonstration purposes

## 📁 File Structure

```
src/app/
├── components/
│   ├── LoginPopup.tsx          # Beautiful login modal component
│   ├── RequireAuth.tsx         # HOC for protecting components
│   └── Header.tsx              # Header with auth-aware navigation
├── contexts/
│   └── AuthContext.tsx         # Global authentication context
├── hooks/
│   └── useRequireAuth.ts       # Custom hook for auth protection
├── (auth)/
│   ├── login/page.tsx          # Login page
│   └── register/page.tsx       # Registration page
├── profile/page.tsx            # Protected profile page example
├── dashboard/page.tsx          # Protected dashboard page example
└── layout.tsx                  # Root layout with AuthProvider
```

## 🔧 How to Use

### 1. Protecting Pages with Popup (Recommended)

Use the `RequireAuth` component to wrap any page that requires authentication:

```tsx
import RequireAuth from "../components/RequireAuth";

export default function MyProtectedPage() {
  return (
    <RequireAuth redirectTo="/my-page">
      <div>
        {/* Your protected content here */}
        <h1>This content requires authentication</h1>
      </div>
    </RequireAuth>
  );
}
```

### 2. Using the Custom Hook

For more control, use the `useRequireAuth` hook:

```tsx
import { useRequireAuth } from "../hooks/useRequireAuth";
import LoginPopup from "../components/LoginPopup";

export default function MyPage() {
  const { isAuthenticated, showLoginPopup, setShowLoginPopup } = useRequireAuth(
    {
      showPopup: true,
      redirectTo: "/my-page",
    }
  );

  if (!isAuthenticated) {
    return (
      <>
        <div>Please sign in to access this page</div>
        <LoginPopup
          isOpen={showLoginPopup}
          onClose={() => setShowLoginPopup(false)}
          redirectTo="/my-page"
        />
      </>
    );
  }

  return <div>Your protected content</div>;
}
```

### 3. Manual Authentication Check

Use the `useAuth` hook for manual authentication checks:

```tsx
import { useAuth } from "../contexts/AuthContext";

export default function MyComponent() {
  const { isAuthenticated, authToken, login, logout } = useAuth();

  const handleLogin = async () => {
    // Your login logic here
    const token = "your-auth-token";
    login(token);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

## 🎨 Login Popup Features

The `LoginPopup` component provides:

- **Beautiful Design**: Modern, responsive modal with smooth animations
- **Form Validation**: Required fields and proper error handling
- **Test Credentials**: Built-in test credentials for easy testing
- **Success Feedback**: Shows success message before redirecting
- **Navigation Links**: Easy access to registration page
- **Close Functionality**: Users can close the popup if needed

## 🔐 Test Credentials

For testing purposes, you can use these credentials with the FakeStore API:

- **Username**: `johnd`
- **Password**: `m38rmF$`

## 📱 User Experience Flow

1. **User visits protected page** → Login popup appears automatically
2. **User enters credentials** → Form validates and submits to API
3. **Login successful** → Token stored, success message shown
4. **Automatic redirect** → User redirected to the original page
5. **Header updates** → Shows "Welcome!" and logout button

## 🛡️ Security Features

- **Token Storage**: Secure localStorage token management
- **Automatic Cleanup**: Tokens removed on logout
- **State Synchronization**: Auth state updates across all components
- **Error Handling**: Proper error messages for failed authentication

## 🎯 Examples

### Profile Page (`/profile`)

- Shows authentication required screen when not logged in
- Displays user profile when authenticated
- Uses the `useRequireAuth` hook for protection

### Dashboard Page (`/dashboard`)

- Wrapped with `RequireAuth` component
- Shows loading state while checking authentication
- Displays dashboard content when authenticated

### Header Component

- Dynamically shows login/register or profile/logout based on auth state
- Provides navigation to protected pages
- Handles logout functionality

## 🔄 API Integration

The system integrates with the FakeStore API:

- **Registration**: `POST https://fakestoreapi.com/users`
- **Login**: `POST https://fakestoreapi.com/auth/login`

## 🚀 Getting Started

1. **Wrap your app** with `AuthProvider` in `layout.tsx` (already done)
2. **Protect pages** using `RequireAuth` component or `useRequireAuth` hook
3. **Test the flow** by visiting `/profile` or `/dashboard` without being logged in
4. **Use test credentials** to log in and see the protected content

## 🎨 Customization

You can customize the login popup by modifying the `LoginPopup.tsx` component:

- Change colors and styling
- Add additional form fields
- Modify the success/error messages
- Add custom animations

The authentication system is now fully functional and ready for production use! 🎉
