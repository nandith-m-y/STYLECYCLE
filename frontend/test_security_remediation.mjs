// Automated Security Remediation Verification Suite
import { validateImageFile, validateImageBatch, MAX_FILE_SIZE_BYTES, MAX_BATCH_IMAGE_COUNT } from "./src/utils/imageSecurity.js";
import { authService } from "./src/services/authService.js";
import { orderService } from "./src/services/orderService.js";

// Mock localStorage for Node test environment
const mockStorage = new Map();
global.localStorage = {
  getItem: (key) => mockStorage.get(key) || null,
  setItem: (key, val) => mockStorage.set(key, String(val)),
  removeItem: (key) => mockStorage.delete(key),
  clear: () => mockStorage.clear()
};

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failed++;
  }
}

async function runTests() {
  console.log("=== STYLECYCLE PHASE 3B SECURITY VERIFICATION SUITE ===\n");

  // 1. Image Validation Tests
  console.log("--- 1. Testing Image Upload Hardening (SEC-VULN-005) ---");
  const validJpg = { name: "garment.jpg", type: "image/jpeg", size: 1024 * 500 };
  assert(validateImageFile(validJpg).valid === true, "Allowed JPEG raster format is accepted");

  const validPng = { name: "fabric.png", type: "image/png", size: 1024 * 1024 };
  assert(validateImageFile(validPng).valid === true, "Allowed PNG raster format is accepted");

  const validWebp = { name: "dress.webp", type: "image/webp", size: 1024 * 300 };
  assert(validateImageFile(validWebp).valid === true, "Allowed WebP raster format is accepted");

  const evilSvg = { name: "payload.svg", type: "image/svg+xml", size: 2048 };
  assert(validateImageFile(evilSvg).valid === false, "SVG file upload is strictly rejected (Stored XSS mitigation)");

  const evilFakePng = { name: "malicious.svg.png", type: "image/svg+xml", size: 2048 };
  assert(validateImageFile(evilFakePng).valid === false, "SVG MIME spoof with double extension is rejected");

  const evilExe = { name: "malware.exe", type: "application/x-msdownload", size: 5000 };
  assert(validateImageFile(evilExe).valid === false, "Executable file is strictly rejected");

  const oversizedImg = { name: "huge_4k.jpg", type: "image/jpeg", size: 8 * 1024 * 1024 };
  assert(validateImageFile(oversizedImg).valid === false, "Images exceeding 5 MB cap are rejected");

  const batchTooBig = [validJpg, validJpg, validJpg, validJpg, validJpg, validJpg];
  assert(validateImageBatch(batchTooBig, 5).valid === false, "Batch exceeding 5 images limit is rejected");

  // 2. Authentication Role Assignment Hardening
  console.log("\n--- 2. Testing Role Assignment Hardening (SEC-VULN-002) ---");
  mockStorage.clear();

  // Attack 1: Email containing 'admin' must NOT get admin role
  const attackerLogin = await authService.login({
    email: "fake_admin@example.com",
    password: "Password123!"
  });
  assert(attackerLogin.role === "user", "Arbitrary email containing 'admin' is assigned role: 'user'");
  assert(attackerLogin.isMockDemoAdmin === false, "Arbitrary email does NOT receive isMockDemoAdmin flag");

  // Attack 2: Registration attempt with admin email and mass-assignment attempt
  const registered = await authService.register({
    fullName: "Hacker User",
    email: "superadmin@attacker.com",
    password: "SecurePassword123!"
  });
  assert(registered.role === "user", "Client registration strictly assigns role: 'user'");
  assert(registered.isMockDemoAdmin === false, "Client registration cannot grant admin privileges");

  // Legitimate Demo Admin Login
  const demoAdmin = await authService.loginDemoAdmin();
  assert(demoAdmin.role === "admin", "Dedicated mock demo admin account has role: 'admin'");
  assert(demoAdmin.isMockDemoAdmin === true, "Dedicated mock demo admin has isMockDemoAdmin: true");

  // Profile update role tampering from standard user
  await authService.loginDemoUser(); // Log in as standard user
  const tamperedProfile = await authService.updateProfile({ name: "Updated Tara", role: "admin", isMockDemoAdmin: true });
  assert(tamperedProfile.role === "user" && !tamperedProfile.isMockDemoAdmin, "Profile update cannot escalate normal user role to admin");

  // 3. Checkout Validation & Price Manipulation Defense
  console.log("\n--- 3. Testing Checkout Hardening & Idempotency (SEC-VULN-003, SEC-VULN-010) ---");
  mockStorage.clear();

  // Attack 3: Negative price injection
  let negativePriceRejected = false;
  try {
    orderService.createOrder({
      items: [{ id: "p1", name: "Blazer", price: -500, quantity: 1 }],
      totalAmount: -500,
      shippingAddress: { name: "Test" }
    });
  } catch (e) {
    negativePriceRejected = true;
  }
  assert(negativePriceRejected, "Negative product price is strictly rejected with validation error");

  // Attack 4: Zero price injection
  let zeroPriceRejected = false;
  try {
    orderService.createOrder({
      items: [{ id: "p1", name: "Blazer", price: 0, quantity: 1 }],
      totalAmount: 0,
      shippingAddress: { name: "Test" }
    });
  } catch (e) {
    zeroPriceRejected = true;
  }
  assert(zeroPriceRejected, "Zero product price is strictly rejected");

  // Attack 5: Invalid quantity
  let invalidQtyRejected = false;
  try {
    orderService.createOrder({
      items: [{ id: "p1", name: "Blazer", price: 1000, quantity: 0 }],
      totalAmount: 1149,
      shippingAddress: { name: "Test" }
    });
  } catch (e) {
    invalidQtyRejected = true;
  }
  assert(invalidQtyRejected, "Quantity 0 is strictly rejected");

  // Valid Order Creation
  const validOrder = orderService.createOrder({
    items: [{ id: "p1", name: "Linen Blazer", brand: "Zara", price: 3000, quantity: 1 }],
    totalAmount: 3000,
    shippingAddress: { name: "Tara Deshmukh", city: "Mumbai", street: "Sea Face", pincode: "400030" },
    paymentMethod: "UPI",
    idempotencyKey: "TEST-IDEMP-001"
  });
  assert(validOrder.id.startsWith("ORD-"), "Valid order generates standard ORD reference");
  assert(validOrder.paymentStatus === "MOCK_SIMULATED_DEMO", "Order contains explicit MOCK_SIMULATED_DEMO payment status");
  assert(validOrder.isMockPayment === true, "Order explicitly flags isMockPayment: true");

  // Idempotency check: submitting same idempotency key returns existing order without creating duplicate
  const duplicateOrder = orderService.createOrder({
    items: [{ id: "p1", name: "Linen Blazer", brand: "Zara", price: 3000, quantity: 1 }],
    totalAmount: 3000,
    shippingAddress: { name: "Tara Deshmukh", city: "Mumbai", street: "Sea Face", pincode: "400030" },
    paymentMethod: "UPI",
    idempotencyKey: "TEST-IDEMP-001"
  });
  assert(duplicateOrder.id === validOrder.id, "Duplicate submission with same idempotency key returns identical order reference");

  console.log(`\n=== RESULTS: ${passed} PASSED, ${failed} FAILED ===\n`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error("Test execution threw unexpected error:", err);
  process.exit(1);
});
