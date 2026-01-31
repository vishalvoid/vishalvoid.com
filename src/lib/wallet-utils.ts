import {
  Keypair,
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  ParsedTransactionWithMeta,
} from "@solana/web3.js";
import * as bip39 from "bip39";
import { derivePath } from "ed25519-hd-key";

export const DEVNET_RPC = "https://api.devnet.solana.com";

export interface DerivedWallet {
  index: number;
  name: string;
  publicKey: string;
  balance: number;
}

export interface TransactionRecord {
  signature: string;
  from: string;
  to: string;
  amount: number;
  timestamp: number;
  status: "pending" | "confirmed" | "failed";
  error?: string;
}

export interface WalletSession {
  name: string;
  mnemonic: string;
  derivedWallets: DerivedWallet[];
  transactions: TransactionRecord[];
  locked: boolean;
}

export function generateMnemonic(): string {
  return bip39.generateMnemonic(128);
}

export function validateMnemonic(mnemonic: string): boolean {
  return bip39.validateMnemonic(mnemonic);
}

export function deriveKeypairFromMnemonic(
  mnemonic: string,
  index: number,
): Keypair {
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const path = `m/44'/501'/${index}'/0'`;
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  return Keypair.fromSeed(derivedSeed);
}

export async function getBalance(
  connection: Connection,
  publicKey: string,
): Promise<number> {
  try {
    const pubKey = new PublicKey(publicKey);
    const balance = await connection.getBalance(pubKey);
    return balance / LAMPORTS_PER_SOL;
  } catch {
    return 0;
  }
}

export async function requestAirdrop(
  connection: Connection,
  publicKey: string,
): Promise<string> {
  const pubKey = new PublicKey(publicKey);
  const signature = await connection.requestAirdrop(
    pubKey,
    1 * LAMPORTS_PER_SOL,
  );
  await connection.confirmTransaction(signature);
  return signature;
}

export async function sendSOL(
  connection: Connection,
  fromKeypair: Keypair,
  toAddress: string,
  amount: number,
): Promise<string> {
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: fromKeypair.publicKey,
      toPubkey: new PublicKey(toAddress),
      lamports: amount * LAMPORTS_PER_SOL,
    }),
  );

  const signature = await connection.sendTransaction(transaction, [
    fromKeypair,
  ]);
  await connection.confirmTransaction(signature);
  return signature;
}

export function validateSolanaAddress(address: string): boolean {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
}

export async function checkRPCHealth(connection: Connection): Promise<boolean> {
  try {
    await connection.getVersion();
    return true;
  } catch {
    return false;
  }
}

export function getExplorerLink(
  signature: string,
  cluster: "devnet" | "mainnet" = "devnet",
): string {
  return `https://explorer.solana.com/tx/${signature}?cluster=${cluster}`;
}

export async function fetchTransactionHistory(
  connection: Connection,
  publicKey: string,
  limit: number = 20,
): Promise<TransactionRecord[]> {
  try {
    const pubKey = new PublicKey(publicKey);
    const signatures = await connection.getSignaturesForAddress(pubKey, {
      limit,
    });

    if (signatures.length === 0) {
      return [];
    }

    const transactions: TransactionRecord[] = [];

    for (const sig of signatures) {
      try {
        const tx = await connection.getParsedTransaction(sig.signature, {
          maxSupportedTransactionVersion: 0,
        });

        if (tx && tx.meta && tx.transaction) {
          const instructions = tx.transaction.message.instructions;

          for (const instruction of instructions) {
            if (
              "parsed" in instruction &&
              instruction.program === "system" &&
              instruction.parsed?.type === "transfer"
            ) {
              const info = instruction.parsed.info;
              transactions.push({
                signature: sig.signature,
                from: info.source,
                to: info.destination,
                amount: info.lamports / LAMPORTS_PER_SOL,
                timestamp: (tx.blockTime || 0) * 1000,
                status: tx.meta.err ? "failed" : "confirmed",
                error: tx.meta.err ? JSON.stringify(tx.meta.err) : undefined,
              });
            }
          }
        }
      } catch {
        continue;
      }
    }

    return transactions;
  } catch {
    return [];
  }
}

export function saveSession(session: WalletSession): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("devnet-wallet", JSON.stringify(session));
  }
}

export function loadSession(): WalletSession | null {
  if (typeof window !== "undefined") {
    const data = sessionStorage.getItem("devnet-wallet");
    if (data) {
      const session = JSON.parse(data);
      session.transactions = [];
      return session;
    }
  }
  return null;
}

export function clearSession(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("devnet-wallet");
  }
}
