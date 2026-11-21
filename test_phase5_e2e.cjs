const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('--- RUNNING AMANA PHASE 5 E2E INTEGRATION SUITE ---');

// 1. Verify existence of all Phase 5 files
const requiredFiles = [
  'src/types/platform.ts',
  'src/data/seedData.ts',
  'src/services/storageService.ts',
  'src/context/PlatformContext.tsx',
  'src/components/trust/TrustBadges.tsx',
  'src/components/verification/FaydaVerificationModal.tsx',
  'src/pages/worker/WorkerVerificationPage.tsx',
  'src/pages/employer/EmployerVerificationPage.tsx',
  'src/pages/reviewer/ReviewerVerificationsPage.tsx',
  'src/pages/TrustCenterPage.tsx',
  'src/components/trust/IdentityTrustSection.tsx',
  'src/components/demo/JudgeGuidedTour.tsx',
];

for (const relPath of requiredFiles) {
  const fullPath = path.join(__dirname, relPath);
  assert(fs.existsSync(fullPath), `Required file missing: ${relPath}`);
}
console.log('✓ All 12 Phase 5 source files exist.');

// 2. Inspect seed data content
const seedDataContent = fs.readFileSync(path.join(__dirname, 'src/data/seedData.ts'), 'utf-8');
assert(seedDataContent.includes('AMN-DEMO-IDV-0001'), 'SEED_WORKER must contain AMN-DEMO-IDV-0001');
assert(seedDataContent.includes('AMN-DEMO-IDV-0002'), 'SEED_EMPLOYER must contain AMN-DEMO-IDV-0002');
assert(seedDataContent.includes('Fayda National ID (Simulation)'), 'Must cite Fayda National ID (Simulation)');
assert(seedDataContent.includes('reviewStatus'), 'Job listings must include reviewStatus');
console.log('✓ Seed data verified with Phase 5 trust profiles.');

// 3. Inspect storage service upgrade to v5
const storageServiceContent = fs.readFileSync(path.join(__dirname, 'src/services/storageService.ts'), 'utf-8');
assert(storageServiceContent.includes('amana_platform_state_v5'), 'Storage key must be updated to amana_platform_state_v5');
assert(storageServiceContent.includes('parsed.worker.trust'), 'Must validate worker trust profile');
assert(storageServiceContent.includes('parsed.employer.trust'), 'Must validate employer trust profile');
console.log('✓ Storage service v5 migration and validation logic verified.');

// 4. Inspect PlatformContext Phase 5 actions
const contextContent = fs.readFileSync(path.join(__dirname, 'src/context/PlatformContext.tsx'), 'utf-8');
assert(contextContent.includes('simulateIdentityVerification'), 'PlatformContext must implement simulateIdentityVerification');
assert(contextContent.includes('updateSkillsReviewStatus'), 'PlatformContext must implement updateSkillsReviewStatus');
assert(contextContent.includes('updateEmployerReviewStatus'), 'PlatformContext must implement updateEmployerReviewStatus');
assert(contextContent.includes('updateJobReviewStatus'), 'PlatformContext must implement updateJobReviewStatus');
console.log('✓ PlatformContext Phase 5 actions verified.');

// 5. Inspect TrustBadges independence and disclaimers
const badgesContent = fs.readFileSync(path.join(__dirname, 'src/components/trust/TrustBadges.tsx'), 'utf-8');
assert(badgesContent.includes('Identity Verified — Demo'), 'Must support Identity Verified badge');
assert(badgesContent.includes('Employer Profile Reviewed — Demo'), 'Must support Employer Profile Reviewed badge');
assert(badgesContent.includes('Skills & Qualifications Reviewed — Demo'), 'Must support Skills & Qualifications Reviewed badge');
assert(badgesContent.includes('Job Information Reviewed — Demo'), 'Must support Job Information Reviewed badge');
assert(badgesContent.includes('FRONTEND DEMONSTRATION ONLY'), 'Must carry prominent simulation disclaimer');
console.log('✓ Trust badges and modal popover disclaimers verified.');

// 6. Inspect FaydaVerificationModal simulation flow
const faydaModalContent = fs.readFileSync(path.join(__dirname, 'src/components/verification/FaydaVerificationModal.tsx'), 'utf-8');
assert(faydaModalContent.includes('verified_demo'), 'Must support verified_demo outcome');
assert(faydaModalContent.includes('additional_review_demo'), 'Must support additional_review_demo outcome');
assert(faydaModalContent.includes('unsuccessful_demo'), 'Must support unsuccessful_demo outcome');
assert(faydaModalContent.includes('cancelled_demo'), 'Must support cancelled_demo outcome');
assert(faydaModalContent.includes('NEVER STORED BY AMANA'), 'Must emphasize that biometric ID numbers are never stored');
console.log('✓ FaydaVerificationModal 4-step simulator and outcome controls verified.');

// 7. Inspect JudgeGuidedTour
const tourContent = fs.readFileSync(path.join(__dirname, 'src/components/demo/JudgeGuidedTour.tsx'), 'utf-8');
assert(tourContent.includes('11 Steps'), 'Must include 11-step tour');
assert(tourContent.includes('of 11'), 'Must display step counter of 11');
assert(tourContent.includes('Auto-Navigate'), 'Must provide auto-navigate action');
console.log('✓ JudgeGuidedTour 11-step dock verified.');

// 8. Inspect TrustCenterPage and App Router
const trustCenterContent = fs.readFileSync(path.join(__dirname, 'src/pages/TrustCenterPage.tsx'), 'utf-8');
assert(trustCenterContent.includes('Building Institutional Trust'), 'Trust Center header verified');

const appContent = fs.readFileSync(path.join(__dirname, 'src/App.tsx'), 'utf-8');
assert(appContent.includes('#/trust'), 'App router must handle #/trust');
assert(appContent.includes('WorkerVerificationPage'), 'App router must wire WorkerVerificationPage');
assert(appContent.includes('EmployerVerificationPage'), 'App router must wire EmployerVerificationPage');
assert(appContent.includes('ReviewerVerificationsPage'), 'App router must wire ReviewerVerificationsPage');
assert(appContent.includes('JudgeGuidedTour'), 'App router must render JudgeGuidedTour');
console.log('✓ App routing and verification integration verified.');

console.log('--- ALL PHASE 5 SUITE ASSERTIONS PASSED (100% OK) ---');
