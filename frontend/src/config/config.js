export const API_CONFIG = {
  isDemoActive: false, // Set to true for demo mode
  
  // Real API endpoints
  apiBaseUrl: 'http://localhost:5555',
  
  // Demo credentials
  demoUser: {
    email: 'demo@foodapp.com',
    password: 'demo123',
    token: 'demo_token',
    name: 'Demo User',
    userId: 'demo123'
  },
  
  // Demo data
  demoData: {
    foodItems: [
      {
        FoodIdPK: 11,
        Name: "Pizza",
        Quantity: 50,
        Cuisine: "Italian",
        price: 10.99
      },
      {
        FoodIdPK: 12,
        Name: "Pasta",
        Quantity: 30,
        Cuisine: "Italian",
        price: 8.99
      },
      {
        FoodIdPK: 13,
        Name: "Dumplings",
        Quantity: 40,
        Cuisine: "Chinese",
        price: 6.99
      },
      {
        FoodIdPK: 14,
        Name: "Spring Rolls",
        Quantity: 25,
        Cuisine: "Chinese",
        price: 4.99
      },
      {
        FoodIdPK: 15,
        Name: "Biryani",
        Quantity: 35,
        Cuisine: "Indian",
        price: 9.99
      },
      {
        FoodIdPK: 16,
        Name: "Paneer Tikka",
        Quantity: 20,
        Cuisine: "Indian",
        price: 7.99
      },
      {
        FoodIdPK: 17,
        Name: "Tacos",
        Quantity: 45,
        Cuisine: "Mexican",
        price: 5.99
      },
      {
        FoodIdPK: 18,
        Name: "Burrito",
        Quantity: 28,
        Cuisine: "Mexican",
        price: 6.99
      },
      {
        FoodIdPK: 19,
        Name: "Croissant",
        Quantity: 55,
        Cuisine: "French",
        price: 3.99
      },
      {
        FoodIdPK: 20,
        Name: "Quiche",
        Quantity: 30,
        Cuisine: "French",
        price: 7.99
      }
    ],
    
    demoUsers: [
      {
        customerId: 1,
        firstName: "Demo",
        lastName: "User",
        email: "demo@foodordering.com",
        password: "demo123",
        token: "demo_token"
      },
      {
        customerId: 2,
        firstName: "Test",
        lastName: "User",
        email: "test@foodordering.com",
        password: "test123",
        token: "test_token"
      }
    ],
    demoOrders: [
      {
        orderId: 16,
        customerId: 1,
        orderDate: "2025-04-10T17:56:19.140Z",
        price: 89.99,
        items: [
          { foodId: 11, name: "Pizza", quantity: 2, status: "Pending" },
          { foodId: 13, name: "Dumplings", quantity: 1, status: "Pending" }
        ],
        foodItems: [
          { foodItemId: 11, qty: 2 },
          { foodItemId: 13, qty: 1 }
        ]
      },
      {
        orderId: 17,
        orderDate: "2025-04-10T19:00:07.810Z",
        price: 89.99,
        items: [
          { foodId: 11, name: "Pizza", quantity: 2, status: "Pending" },
          { foodId: 13, name: "Dumplings", quantity: 1, status: "Pending" }
        ]
      },
      {
        orderId: 18,
        orderDate: "2025-04-10T19:52:34.350Z",
        price: 89.99,
        items: [
          { foodId: 11, name: "Pizza", quantity: 2, status: "Pending" },
          { foodId: 13, name: "Dumplings", quantity: 1, status: "Pending" }
        ]
      },
      {
        orderId: 19,
        orderDate: "2025-04-13T11:11:06.130Z",
        price: 89.99,
        items: [
          { foodId: 11, name: "Pizza", quantity: 2, status: "Pending" },
          { foodId: 13, name: "Dumplings", quantity: 1, status: "Pending" }
        ]
      },
      {
        orderId: 20,
        orderDate: "2025-04-13T11:13:42.403Z",
        price: 89.99,
        items: [
          { foodId: 11, name: "Pizza", quantity: 2, status: "Pending" },
          { foodId: 13, name: "Dumplings", quantity: 1, status: "Pending" }
        ]
      },
      {
        orderId: 21,
        orderDate: "2025-04-13T11:13:57.597Z",
        price: 89.99,
        items: [
          { foodId: 11, name: "Pizza", quantity: 2, status: "Pending" },
          { foodId: 13, name: "Dumplings", quantity: 1, status: "Pending" }
        ]
      },
      {
        orderId: 23,
        orderDate: "2025-04-13T11:22:31.710Z",
        price: 10,
        items: [
          { foodId: 11, name: "Pizza", quantity: 10, status: "Pending" },
          { foodId: 13, name: "Dumplings", quantity: 1, status: "Pending" }
        ],
        foodItems: [
          { foodItemId: 11, qty: 10 },
          { foodItemId: 13, qty: 1 }
        ]
      },
      {
        orderId: 24,
        orderDate: "2025-04-13T21:26:32.083Z",
        price: 10,
        items: [
          { foodId: 11, name: "Pizza", quantity: 10, status: "Pending" },
          { foodId: 13, name: "Dumplings", quantity: 1, status: "Pending" }
        ],
        foodItems: [
          { foodItemId: 11, qty: 10 },
          { foodItemId: 13, qty: 1 }
        ]
      }
    ]
  }
};

export const API_ENDPOINTS = {
  login: `${API_CONFIG.apiBaseUrl}/login`,
  signup: `${API_CONFIG.apiBaseUrl}/signup`,
  logout: `${API_CONFIG.apiBaseUrl}/logout`,
  foodItems: `${API_CONFIG.apiBaseUrl}/fooditems`,
  foodItemById: (id) => `${API_CONFIG.apiBaseUrl}/fooditem/${id}`,
  orders: `${API_CONFIG.apiBaseUrl}/orders`,
  orderById: (id) => `${API_CONFIG.apiBaseUrl}/orders/${id}`,
  createOrder: `${API_CONFIG.apiBaseUrl}/orders`
};
