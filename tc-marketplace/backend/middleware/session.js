import crypto from "crypto";

export const ensureCartSession = (req, res, next) => {
  let sessionId = req.cookies?.cartSessionId;

  if (!sessionId) {
    sessionId = crypto.randomUUID();

    res.cookie("cartSessionId", sessionId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
    });
  }

  req.cartSessionId = sessionId;
  next();
};