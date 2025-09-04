import { AppError } from './ApiErrors.js';

export const notFound = (req, res, next) => {
  // If request URL not matched with any route
  if (req.originalUrl.startsWith('/v1/api')) {
    // For API
    res.status(404);
    return res.json({ message: "API route not found" });
  } else {
    // For Web Pages
    res.status(404);
    return res.render("pages/NoFound/404", { title: "Page Not Found" });
  }
};

export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  if (req.originalUrl.startsWith('/v1/api')) {
    const statusCode = err instanceof AppError ? err.statusCode : 500;
     const messageKey = err.message || "internal_server_error";
     const translatedMessage = req.t ? req.t(messageKey) : messageKey;
    // API Error response
    res.status(statusCode).json({
      message: translatedMessage,
      stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
  } else {
    // Web Error Page
    res.status(err.status || 500);
    res.render("pages/NoFound/404", {
      title: "Error",
      message: err.message || "Something went wrong!"
    });
  }
};
