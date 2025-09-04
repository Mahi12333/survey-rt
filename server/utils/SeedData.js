import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { ROLE_NAMES } from "./constanse.js";
import { User, Role } from "../model/index.js";

console.log("SeedData");

export const seedRoles = async () => {
  const defaultRoles = Object.values(ROLE_NAMES);

  for (const name of defaultRoles) {
    const existingRole = await Role.findOne({ name });
    if (!existingRole) {
      await Role.create({ name });
      console.log(`✅ Role created: ${name}`);
    } else {
      console.log(`ℹ️ Role already exists: ${name}`);
    }
  }
};

export const seedSuperAdmin = async () => {
  const superAdminEmail = "mahitoshgiri287@gmail.com";

  const existingUser = await User.findOne({ email: superAdminEmail });
  if (existingUser) {
    console.log(`ℹ️ Super Admin already exists: ${superAdminEmail}`);
    return;
  }

  const superAdminRole = await Role.findOne({ name: ROLE_NAMES.ADMIN });
  if (!superAdminRole) {
    throw new Error("❌ Super Admin role not found during seeding");
  }

  const hashedPassword = await bcrypt.hash("Mahitosh@123", 10);

  await User.create({
    name: "Mahitosh",
    email: superAdminEmail,
    user_name: "mahitoshgiri287",
    mobile: "9330629877",
    password: hashedPassword,
    login_from: "local",
    role_id: superAdminRole._id, // MongoDB uses _id
    profile_picture:
      "https://ik.imagekit.io/runtime/uploads_images_thumb-1920-1350882_20250805092622.png",
    profile_complete: "COMPLETE",
  });

  console.log(`✅ Super Admin created: ${superAdminEmail}`);
};

export const connectAndSeed = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...");
    // await mongoose.connect(process.env.MONGO_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });


    // console.log("✅ MongoDB connected.");

    await seedRoles();
    await seedSuperAdmin();

    console.log("✅ Database seeded successfully.");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    mongoose.connection.close();
  }
};
