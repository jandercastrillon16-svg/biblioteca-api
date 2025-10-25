function authorizeRole(requiredRole) {
  return (req, res, next) => {
    const user = req.user; // viene del middleware getCurrentUser
    if (!user) return res.status(401).json({ message: "No autorizado" });
    if (user.role !== requiredRole) {
      return res.status(403).json({ message: "Acceso prohibido" });
    }
    next();
  };
}

module.exports = authorizeRole;
