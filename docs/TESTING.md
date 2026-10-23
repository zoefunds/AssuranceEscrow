# Testing

## Direct Mode

Run:

```bash
pytest -q test_assurance_escrow_e2e.py
```

The current suite contains 43 tests. It executes the actual `AssuranceEscrow` source in GenLayer Direct Mode and mocks only the external web boundary. Coverage includes:

- primary quorum, receipt provenance, and deterministic uptime classification;
- frozen counterevidence, both challenger roles, bond routing, and dispute-time substitution rejection;
- DID, URL, HTTP-status, digest, metadata, schema, identity, and measurement-fact validation;
- prompt-injection resistance and publisher-outcome non-authority;
- retries, validator disagreement, recovery paths, replay protection, transfer failure atomicity, and conservation;

## Verified Studionet E2E

The current v2 contract completed a real funded lifecycle on rail `1`. Each transaction finalized with `MAJORITY_AGREE` and execution evidence:

| Action | Transaction |
| --- | --- |
| Open 0.01 GEN rail | `0x282b454a0400d0748ce5107171da1852a7b6fa49b3477ffb47880c754b18bd1c` |
| Lodge recipient claim | `0xdca6ca69b618e42e8d3cf3b9cfd1ae2fac38c5c21771526d2e1120311d1ef18c` |
| Primary review | `0xedf79d55056a92ef2c7602248176c640c79eaae93ec74068f373e8b7fc169ae1` |
| Post challenge bond | `0x5734919a2e610d3723a66c969be42881b35e0a601e95af733cdee5d57486dd2b` |
| Counterevidence review and settlement | `0x95643562e0ab784e3e5afde3fa2ce6a1638443f37d7ec6c7bdb14be3d8a70b07` |

The primary receipt has two verified, agreeing `FULFILLED` sources. The dispute receipt has three verified, agreeing `BREACHED` sources. Final settlement paid `10000000000000000` wei (0.01 GEN), with `locked = 0` and `bonds_locked = 0`. The full record is [live E2E evidence](../evidence/live-e2e-assurance-escrow-v2-4.studionet.json).
