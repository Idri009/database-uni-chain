#!/usr/bin/env node

/**
 * Test script to run readEduNFTScript.ts with different addresses
 * Usage: node scripts/test-nft-script.js [address]
 */

const { exec } = require('child_process');
const path = require('path');

// Default test addresses
const TEST_ADDRESSES = [
  "0x286db307079C9C92b55D20b33e4eAB6d2A588E54", // Default from .env
  "0x742d35Cc6606a4Ed8CAB7b3e5B3E5A1d8Ec8C4e5", // Another test address
  "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", // vitalik.eth
];

const testAddress = process.argv[2];

if (testAddress) {
  console.log(`🧪 Testing with custom address: ${testAddress}`);
  runScript(testAddress);
} else {
  console.log("🧪 Testing with default addresses...");
  console.log("Available test addresses:");
  TEST_ADDRESSES.forEach((addr, i) => {
    console.log(`  ${i + 1}. ${addr}`);
  });
  
  console.log("\n🔄 Running with default address...");
  runScript(TEST_ADDRESSES[0]);
}

function runScript(address) {
  const scriptPath = path.join(__dirname, '../readEduNFTScript.ts');
  const command = `npx tsx ${scriptPath} ${address}`;
  
  console.log(`\n⚡ Executing: ${command}\n`);
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error: ${error.message}`);
      return;
    }
    
    if (stderr) {
      console.error(`⚠️  Warning: ${stderr}`);
    }
    
    console.log(stdout);
    
    console.log("\n" + "=".repeat(60));
    console.log("✅ Script completed!");
    console.log("💡 Tip: You can test with a custom address:");
    console.log(`   node scripts/test-nft-script.js YOUR_ADDRESS_HERE`);
  });
}
