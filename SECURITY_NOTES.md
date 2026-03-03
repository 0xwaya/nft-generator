# SECURITY_NOTES.md — nft-generator

Date: 2026-03-02 (America/New_York)

## Security considerations for this repo

1. **Supply chain + dependency pinning (High)**
   - This toolchain relies on image and upload packages (`canvas`, `nft.storage`, etc.).
   - Ensure lockfile discipline and regular vulnerability triage.

2. **Metadata integrity (High)**
   - Validate generated metadata consistency before upload/mint.
   - Keep deterministic generation settings and track trait source hashes.

3. **Upload credential hygiene (High)**
   - Keep NFT storage/API tokens in environment variables only.
   - Do not commit any credentials in scripts or config.

4. **Asset provenance (Medium)**
   - Track licensing and ownership of all layers/art assets.
   - Maintain reproducible layer manifests to avoid accidental trait swaps.

5. **Solidity / Cyfrin alignment (if contract code is added later)**
   - Use CEI pattern, access control (Ownable/roles), fuzz + invariant tests, and explicit reentrancy/authorization threat modeling.

## Audit limitation note
- Repo currently has substantial uncommitted local changes across assets/runtime; full confident security hardening patching deferred until clean baseline.
