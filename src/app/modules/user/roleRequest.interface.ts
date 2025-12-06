import { Schema, model, Types } from "mongoose";
import { Role } from "./user.interface";

export type status = "pending" | "approved" | "rejected";

interface IRoleRequest {
    user: Types.ObjectId;
    requestedRole: Role;
    status: status;
    createdAt?: Date;
}

const roleRequestSchema = new Schema<IRoleRequest>({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    requestedRole: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
}, { timestamps: true });

export const RoleRequest = model("RoleRequest", roleRequestSchema);

