import { Invite } from "../models/Invite.model.js";
import { Server } from "../models/server.model.js";
import { generateInviteCode } from "../utils/generateInviteCode.js"


const createInvite = async(req,res,next)=> {
    try {

        const {serverId, expiresIn, maxUses} = req.body;

        const server = await Server.findById(serverId);
        if(!server){
            return res.status(404).json(
                {
                    message: "Server not found"
                }
            )
        }

        const member = server.members.find((e) => e.userId.toString() === req.user.id)

        if(!["OWNER", "ADMIN"].includes(member?.roles)){
            return res.status(403).json(
                {
                    message: "Permission denied"
                }
            )
        }

        const invite = await Invite.create(
            {
                serverId,
                code: generateInviteCode(),
                createdBy: req.user.id,
                expiresAt: expiresIn? new Date(Date.now() + expiresIn * 60 * 1000): null,maxUses: maxUses || 0
            }
        )

        res.status(201).json(
            {
                inviteLink: `${process.env.CLIENT_URL}/invite/${invite.code}`, invite
            }
        )

    } catch (error) {
        next(error)
    }
}


const joinViaInvite = async(req,res,next)=> {
    try {
        
    } catch (error) {
        next(error)
    }
}


export {
    createInvite,
    joinViaInvite
}