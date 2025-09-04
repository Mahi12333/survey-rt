import {sequelize} from '../../config/database/connection.js';
import { User, Role } from '../model/index.js'; // adjust path if needed
import { ROLE_NAMES } from './constanse.js';
import bcrypt from 'bcrypt';

console.log("SeedData")

export const seedRoles = async () => {
  const defaultRoles = Object.values(ROLE_NAMES);
  for (const name of defaultRoles) {
    await Role.findOrCreate({
      where: { name },
      defaults: { name }
    });
  }
};

export const seedSuperAdmin = async () => {
  const superAdminEmail = 'mahitoshgiri287@gmail.com';

  const existing = await User.findOne({ where: { email: superAdminEmail } });
  if (existing) {
    console.log(`ℹ️ Super Admin already exists: ${superAdminEmail}`);
    return;
  }

  const superAdminRole = await Role.findOne({ where: { name: ROLE_NAMES.ADMIN } });
  if (!superAdminRole) {
    throw new Error("❌ Super Admin role not found during seeding");
  }

  const hashedPassword = await bcrypt.hash('Mahitosh@123', 10);

  await User.create({
    name: "Mahitosh",
    email: superAdminEmail,
    user_name: "mahitoshgiri287",
    mobile: "9330629877",
    password: hashedPassword,
    login_from: "local",
    role_id: superAdminRole.id,
    profile_picture: "https://ik.imagekit.io/runtime/uploads_images_thumb-1920-1350882_20250805092622.png",
    profile_complete: "COMPLETE",
  });

  console.log(`✅ Super Admin created: ${superAdminEmail}`);
};


export const syncDB = async () => {
  try {
    console.log("🔄 Syncing DB...");
    await sequelize.authenticate();
    await sequelize.sync({ alter: false, logging: false });

    await seedRoles();
    await seedSuperAdmin();

    console.log("✅ Database synced and seeded successfully.");
  } catch (err) {
    console.error("❌ Sync error:", err);
  }
};

// await syncDB();

