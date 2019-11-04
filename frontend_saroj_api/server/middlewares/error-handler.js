module.exports = errorHandler;

function errorHandler(err, req, res, next) { 
  console.log(err); 
  if(err.sqlMessage != null){    
    return res.status(500).json({ message: "My sql error" });
  }
  if (typeof err === "string") {
    // custom application error
    return res.status(400).json({ message: err });
  }

  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    return res.status(401).json({ message: "Invalid Token" });
  }

  if (err.name === "NotFound") {
    // jwt authentication error
    return res.status(404).json({ message: "Invalid Url" });
  }

  // default to 500 server error
  return res.status(500).json({ message: err.message });
}
