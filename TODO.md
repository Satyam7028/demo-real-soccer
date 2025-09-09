# Admin Pages Implementation TODO

## 1. Enhance AdminDashboard
- Add real metrics from Redux/API (total users, products, orders, etc.)
- Make buttons link to respective admin pages
- Add navigation links

## 2. Implement UsersPage CRUD
- Connect to Redux for fetching users
- Add list view with table
- Add Create User functionality (modal/form)
- Add Edit User functionality
- Add Delete User functionality
- Handle loading states and errors

## 3. Implement PlayersPage CRUD
- Connect to Redux for fetching players
- Add list view with table
- Add Create Player functionality
- Add Edit Player functionality
- Add Delete Player functionality

## 4. Implement LeaguesPage CRUD
- Connect to Redux for fetching leagues
- Add list view with table
- Add Create League functionality
- Add Edit League functionality
- Add Delete League functionality

## 5. Implement FixturesPage CRUD
- Connect to Redux for fetching fixtures
- Add list view with table
- Add Create Fixture functionality
- Add Edit Fixture functionality
- Add Delete Fixture functionality

## 6. Implement NewsPage CRUD
- Connect to Redux for fetching news articles
- Add list view with table
- Add Create News Article functionality
- Add Edit News Article functionality
- Add Delete News Article functionality

## 7. Implement OrdersPage CRUD
- Connect to Redux for fetching orders
- Add list view with table
- Add View Order Details functionality
- Add Update Order Status functionality
- Add Delete Order functionality (if applicable)

## 8. Enhance ProductsPage CRUD
- Connect to Redux for fetching products
- Add Create Product functionality
- Add Edit Product functionality
- Add Delete Product functionality
- Handle stock management

## 9. Enhance ReportsPage
- Connect to Redux for real statistics
- Add charts for metrics (using a charting library like Chart.js)
- Add filters for date ranges
- Add export functionality

## 10. General Improvements
- Ensure all pages are protected with AdminRoute
- Add consistent styling with Tailwind
- Add loading spinners and error handling
- Test all functionalities
- Update server routes/controllers if needed for admin-specific endpoints
