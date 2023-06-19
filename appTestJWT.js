const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

// Secret key for JWT
const secretKey = 'your-secret-key';
app.use(express.json());       
app.use(express.urlencoded({extended: true})); 
// Mock user data (replace with your own database or authentication logic)
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];

// Login route
app.post('/login', (req, res) => {
  // Mock username and password from request body (replace with appropriate form field names)
  console.log(req.body)
  const { username, password } = req.body;

  // Find user in the mock user data
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' });
  } else {
    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  }
});

// Protected route
app.get('/protected', verifyToken, (req, res) => {
    const user = req.decoded; // User information extracted from the JWT
        console.log("usuario id",user)
  res.json({ message: 'You have access to the protected route' });
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    console.log("verificando")
    console.log(req.headers.authorization)
    console.log(req.headers)
    //const token = authHeader.split(' ')[1];
  const token = req.headers.authorization.split(' ')[1];
  console.log("token2",token)

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
  } else {
    // Verify JWT token
    jwt.verify(token, secretKey, (err, decoded) => {
        
      if (err) {
        res.status(401).json({ message: 'Invalid token' });
      } else {
        // Store the decoded token in the request object for further use
        console.log("el token",token)
        console.log("la secret key",secretKey)
        var lare = jwt.decode(token)
        console.log("decoded",lare.authorization)
        req.decoded = decoded;
        console.log("decoded",decoded)
        next();
      }
    });
  }
}

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});