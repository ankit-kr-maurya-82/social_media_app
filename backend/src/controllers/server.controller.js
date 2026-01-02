import { Server } from "../models/Server.js";


 const createServer = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name required" });

    const server = await Server.create({
      name,
      owner: req.user.id,
      members: [req.user.id],
    });

    res.status(201).json(server);
  } catch (err) {
    next(err);
  }
};

 const getMyServers = async (req, res, next) => {
  try {
    const servers = await Server.find({
      members: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(servers);
  } catch (err) {
    next(err);
  }
};

const joinServer = async (req, res, next) => {
  try {
    const server = await Server.findById(req.params.id);
    if (!server) return res.status(404).json({ message: "Server not found" });

    if (server.members.includes(req.user.id)) {
      return res.status(400).json({ message: "Already a member" });
    }

    server.members.push(req.user.id);
    await server.save();

    res.json({ message: "Joined server" });
  } catch (err) {
    next(err);
  }
};


const leaveServer = async (req, res, next) => {
  try {
    const server = await Server.findById(req.params.id);
    if (!server) return res.status(404).json({ message: "Server not found" });

    server.members = server.members.filter(
      (m) => m.toString() !== req.user.id
    );

    await server.save();
    res.json({ message: "Left server" });
  } catch (err) {
    next(err);
  }
};


export {
    createServer,
    getMyServers,
    joinServer,
    leaveServer,
}