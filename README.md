# login-dashboard
This project demonstrates a login-based dashboard system with CRUD operations for managing user data. The application allows users to log in, view a dashboard, and perform actions like adding, editing, and deleting items. It uses Redux for state management and toast notifications for success and error feedback.

## Features

- **User Authentication**: Login page that authenticates users and provides access to the dashboard.
- **Dashboard**: A data table with the ability to:
  - View user data (name, age, and date of birth).
  - Add new items (name and date of birth).
  - Edit existing items.
  - Delete items.
- **Toast Notifications**: Success and error messages for all actions.
- **State Management**: Redux to manage authentication and data.
- **Loading Indicators**: Skeleton loaders displayed while fetching data.

## Technologies Used

- **React**: For building the user interface.
- **Redux**: For managing global state (authentication and data).
- **React Router**: For routing between pages (Login, Dashboard).
- **Toastify**: For displaying toast notifications.
- **LocalStorage**: For persisting user authentication state.
- **CSS**: For styling the application.
