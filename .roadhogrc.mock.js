export default {
  // Support type as Object and Array
  'GET /api/users': { users: [1,2] },
 
  // Method like GET or POST can be omitted
  '/api/users/1': { id: 1 },
 
  // Support for custom functions, the API is the same as express@4
  'POST /api/users/create': (req, res) => { res.end('OK'); },
};