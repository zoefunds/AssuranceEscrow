# Architecture

`AssuranceEscrow` holds a native-token escrow for a named recipient and resolves it through frozen, content-addressed evidence.

## Lifecycle

1. The issuer calls `open_rail` with the recipient, payout table, timing bounds, and the complete primary and counterevidence panels.
2. After the observation period, only the recipient can call `lodge_claim`.
3. Anyone can call `review_claim`. The contract retrieves the primary panel through GenLayer nondeterministic web access and records a receipt.
4. A verified primary result becomes provisional for 48 hours. Either party can post the fixed 5% bond and call `dispute` with the precommitted counterevidence panel.
5. `review_dispute` evaluates the counter panel. A verified result settles the escrow and routes the bond to the successful party; an unresolved dispute can be recovered after its deadline.

## Evidence and settlement rules

- Every DID document and evidence object is pinned by SHA-256, HTTP status, exact HTTPS URL, publisher identity, service path, version, and observation window.
- Sources must be distinct across both panels by publisher domain, DID, authority ID, and source ID.
- The current policy accepts two primary sources with a 2-of-2 agreement and three counter sources with at least 3 verified sources and 2 agreeing sources. A strict majority of all verified sources is also required.
- Uptime is calculated from structured facts. Publisher-declared outcomes and free-text statements do not choose the payout.
- Receipts persist the result, source counts, provenance, and a digest of the evidence policy plus the payout table.
- Global accounting enforces `funded = locked + paid + returned`; settlements run under a transfer callback guard.

## Schemas

Policies use `assurance-escrow.evidence-policy/v1`, `assurance-escrow.counterevidence/v1`, and `assurance-escrow.independent-attestation/v1`. Every evidence object must use these exact schemas.
