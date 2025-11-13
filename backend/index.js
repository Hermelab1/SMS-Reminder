import { DataTypes } from "sequelize";
import { initDatabase } from "../config/db.js";

let db;
export const initModels = async () => {
  db = await initDatabase();

  const Member = db.define("Member", {
    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    start_date: { type: DataTypes.DATE, allowNull: false },
    expiry_date: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: "active" },
  });

  const Message = db.define("Message", {
    message: { type: DataTypes.TEXT },
    type: { type: DataTypes.STRING },
  });

  const Event = db.define("Event", {
    title: { type: DataTypes.STRING },
    event_date: { type: DataTypes.DATE },
    description: { type: DataTypes.TEXT },
  });

  // Relationships
  Member.hasMany(Message, { foreignKey: "member_id" });
  Message.belongsTo(Member, { foreignKey: "member_id" });

  // Sync all models
  await db.sync({ alter: true }); // alter updates schema automatically
  console.log("✅ All models synchronized");

  return { db, Member, Message, Event };
};
