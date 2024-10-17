import express from "express";

// Importing controller functions for hotel reservations

import { cancelHotelReservation, createHotelReservation, customizeHotelReservation, getHotelTicket, getUserHotelTickets, showHotelReservation } from "../controllers/hotelReservation.js";

const router = express.Router();

router.post('/create',createHotelReservation);
router.get('/',showHotelReservation);
router.put('/customize/:id',customizeHotelReservation);
router.delete('/cancel/:id',cancelHotelReservation);
router.get("/user/:userId",getUserHotelTickets);
router.get("/:id",getHotelTicket);

export default router;