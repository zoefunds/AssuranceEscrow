# Evidence notes

The committed deployment and E2E JSON files are immutable capture records from the finalized Studionet run on 2026-10-23. They contain transaction hashes, contracts, source digests, policies, receipts, and final accounting so a reviewer can independently inspect the chain activity.

The live run intentionally exercised migration compatibility with the predecessor's frozen `proofrail.*` policy and attestation schemas. Those identifiers and source domains in the evidence are historical compatibility data, not a claim that the `AssuranceEscrow` contract itself is named ProofRail.

The five evidence sources were technically distinct by origin, DID, authority ID, and source ID, and all accepted bytes matched their committed SHA-256 digests at review time. That proves contract-level identity separation and content integrity. It does not by itself prove that the source operators were separate real-world organizations.

No private keys, tokens, or account secrets are committed. The public account addresses in the live evidence are transaction participants, not credentials.
