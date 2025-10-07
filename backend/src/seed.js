import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";   

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  console.log("🚀 Seeding users...");

  await User.deleteMany();

  const users = [
    { id: 1, firstName: "Samantha", middleName: "Rodriguez", lastName: "Cesar", email: "samantha@example.com", role: "user" },
    { id: 2, firstName: "Lianna", middleName: "Nuylan", lastName: "Cuesta", email: "lianna@example.com", role: "user" },
    { id: 3, firstName: "Juan", middleName: "Garcia", lastName: "Dela Cruz", email: "juan@test.com", role: "user" },
    { id: 4, firstName: "Jane", middleName: "Havar", lastName: "Sy", email: "jane@test.com", role: "user" },
    { id: 5, firstName: "Dawn", middleName: "Frando", lastName: "Cruz", email: "dawn@test.com", role: "admin" },
    { id: 6, firstName: "Ethan", middleName: "Chua", lastName: "Ramirez", email: "ethan@test.com", role: "user" },
    { id: 7, firstName: "Daniel", middleName: "John", lastName: "Navarro", email: "mark@test.com", role: "user" },
    { id: 8, firstName: "Andrea", middleName: "Corpuz", lastName: "Villanueva", email: "andrea@test.com", role: "user" },
    { id: 9, firstName: "Michael", middleName: "Reys", lastName: "Tan", email: "michael@test.com", role: "user" },
    { id: 10, firstName: "Sophia", middleName: "Ang", lastName: "Reyes", email: "sophia@test.com", role: "user" },
    { id: 11, firstName: "Carlos", middleName: "Aquino", lastName: "Dela Cruz", email: "carlos@test.com", role: "user" },
    { id: 12, firstName: "Isabella", middleName: "Ariego", lastName: "Santos", email: "isabella@test.com", role: "user" },
    { id: 13, firstName: "James", middleName: "West", lastName: "Lim", email: "james@test.com", role: "user" },
    { id: 14, firstName: "Angela", middleName: "Romero", lastName: "Cruz", email: "angela@test.com", role: "user" },
    { id: 15, firstName: "Robert", middleName: "Tornea", lastName: "Mendoza", email: "robert@test.com", role: "user" },
    { id: 16, firstName: "Patricia", middleName: "Tanacio", lastName: "Gomez", email: "patricia@test.com", role: "user" },
    { id: 17, firstName: "Henry", middleName: "Vercide", lastName: "Ocampo", email: "henry@test.com", role: "user" },
    { id: 18, firstName: "Monica", middleName: "Andales", lastName: "Flores", email: "monica@test.com", role: "admin" },
    { id: 19, firstName: "Joshua", middleName: "Fendo", lastName: "Torres", email: "joshua@test.com", role: "user" },
    { id: 20, firstName: "Christine", middleName: "Jaboc", lastName: "Chua", email: "christine@test.com", role: "user" },
    { id: 21, firstName: "Victor", middleName: "Olayon", lastName: "Ramos", email: "victor@test.com", role: "user" },
    { id: 22, firstName: "Elaine", middleName: "Jayobo", lastName: "Bautista", email: "elaine@test.com", role: "user" },
  ];

  const usersWithPasswords = await Promise.all(
    users.map(async (u) => ({
      ...u,
      password: await bcrynpt.hash(u.role === "Admin" ? "admin123" : "user123", 10)
    }))
  );

  await User.insertMany(usersWithPasswords);

  console.log("✅ Users seeded successfully");
  mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  mongoose.disconnect();
});
