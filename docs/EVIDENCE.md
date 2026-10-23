# Evidence notes

Do not commit private keys, API tokens, or evidence material that does not use the AssuranceEscrow schema family. Before opening a rail, check that every source has a unique origin, DID, authority ID, and source ID; an exact URL and SHA-256 digest; an HTTP-200 pin; and an observation window matching the policy.

Store finalized deployment and lifecycle reports under `evidence/` only when they are safe to publish. A release report should record the contract address, transaction hashes, consensus and execution status, source digest, receipt source counts, settlement result, and final accounting. Public account addresses are transaction participants, not credentials.
