const Flight = require("../models/flight");
const Ticket = require("../models/ticket");

module.exports = {
  index,
  new: newFlight,
  show,
  create,
  addDestination,
  newTicket,
  createTicket,
  delete: deleteTicket
};

async function index(req, res) {
  const flights = await Flight.find({}).populate();
  res.render("flights/index", { title: "ALL FLIGHTS", flights });
}

async function newFlight(req, res) {
  res.render("flights/new", { title: "ADD FLIGHT" });
}

async function create(req, res) {
  const flight = await Flight.create(req.body);
  res.redirect("/flights");
}

async function show(req, res) {
  const flight = await Flight.findById(req.params.id);
  const tickets = await Ticket.find({ flight: flight._id });
  res.render("flights/show", { title: "FLIGHT DETAILS", flight, tickets });
}

async function addDestination(req, res) {
  const flight = await Flight.findById(req.params.id);
  flight.destinations.push(req.body);
  await flight.save();
  res.redirect(`/flights/${flight._id}`);
}

async function newTicket(req, res) {
  const flight = await Flight.findById(req.params.id);
  res.render("tickets/new", { title: "ADD TICKET", flight });
}

async function createTicket(req, res) {
  const flight = await Flight.findById(req.params.id);
  const ticket = await Ticket(req.body);
  ticket.flight = flight._id;
  await ticket.save();
  res.redirect(`/flights/${flight._id}`);
}

async function deleteTicket(req, res) {
  await Ticket.findByIdAndDelete(req.params.id);
  res.redirect(`/flights/${req.params.flightId}`);
}