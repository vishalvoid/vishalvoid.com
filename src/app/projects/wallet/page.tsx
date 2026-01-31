"use client";
import PageShellWrapper from "@/components/layouts/page-shell";
import React, { useState, useEffect } from "react";
import { Connection } from "@solana/web3.js";
import {
  generateMnemonic,
  deriveKeypairFromMnemonic,
  getBalance,
  requestAirdrop,
  sendSOL,
  validateSolanaAddress,
  checkRPCHealth,
  getExplorerLink,
  saveSession,
  loadSession,
  clearSession,
  fetchTransactionHistory,
  DEVNET_RPC,
  type DerivedWallet,
  type TransactionRecord,
  type WalletSession,
} from "@/lib/wallet-utils";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import bs58 from "bs58";

type Step = "name" | "seed" | "wallet";

export default function Wallet() {
  const [step, setStep] = useState<Step>("name");
  const [session, setSession] = useState<WalletSession | null>(null);
  const [walletName, setWalletName] = useState("");
  const [mnemonic, setMnemonic] = useState("");
  const [seedConfirmed, setSeedConfirmed] = useState(false);
  const [seedRevealed, setSeedRevealed] = useState(false);
  const [currentWalletIndex, setCurrentWalletIndex] = useState(0);
  const [rpcHealthy, setRpcHealthy] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [sendTo, setSendTo] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [sendError, setSendError] = useState("");
  const [sending, setSending] = useState(false);
  const [airdropping, setAirdropping] = useState(false);
  const [airdropMessage, setAirdropMessage] = useState("");
  const [showSeedModal, setShowSeedModal] = useState(false);
  const [showPrivateKeyModal, setShowPrivateKeyModal] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedSeed, setCopiedSeed] = useState(false);
  const [copiedPrivateKey, setCopiedPrivateKey] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingTransactions, setLoadingTransactions] = useState(false);

  const connection = new Connection(DEVNET_RPC, "confirmed");

  const refreshTransactions = async () => {
    if (!session) return;
    setLoadingTransactions(true);
    try {
      const allTransactions: TransactionRecord[] = [];
      for (const wallet of session.derivedWallets) {
        const txs = await fetchTransactionHistory(connection, wallet.publicKey);
        allTransactions.push(...txs);
      }
      allTransactions.sort((a, b) => b.timestamp - a.timestamp);
      const uniqueTransactions = allTransactions.filter(
        (tx, index, self) =>
          index === self.findIndex((t) => t.signature === tx.signature),
      );
      setSession((currentSession) => {
        if (!currentSession) return currentSession;
        const updated = { ...currentSession, transactions: uniqueTransactions };
        saveSession(updated);
        return updated;
      });
    } catch (e) {
      console.error("Failed to fetch transactions:", e);
    } finally {
      setLoadingTransactions(false);
    }
  };

  useEffect(() => {
    const loaded = loadSession();
    if (loaded && !loaded.locked) {
      setSession(loaded);
      setStep("wallet");
    }

    checkRPCHealth(connection).then((healthy) => {
      setRpcHealthy(healthy);
    });
  }, []);

  useEffect(() => {
    if (session && step === "wallet") {
      refreshBalances();
      refreshTransactions();
    }
  }, [session?.derivedWallets.length, step]);

  const refreshBalances = async () => {
    if (!session) return;

    const balances = await Promise.all(
      session.derivedWallets.map((w) => getBalance(connection, w.publicKey)),
    );

    setSession((currentSession) => {
      if (!currentSession) return currentSession;
      const updated = { ...currentSession };
      updated.derivedWallets = updated.derivedWallets.map((w, i) => ({
        ...w,
        balance: balances[i],
      }));
      saveSession(updated);
      return updated;
    });
  };

  const handleCreateWallet = () => {
    if (!walletName.trim() || walletName.length > 30) return;
    const mnem = generateMnemonic();
    setMnemonic(mnem);
    setStep("seed");
  };

  const handleConfirmSeed = async () => {
    if (!seedConfirmed) return;
    const keypair = deriveKeypairFromMnemonic(mnemonic, 0);
    const newSession: WalletSession = {
      name: walletName,
      mnemonic,
      derivedWallets: [
        {
          index: 0,
          name: "Wallet 1",
          publicKey: keypair.publicKey.toBase58(),
          balance: 0,
        },
      ],
      transactions: [],
      locked: false,
    };
    setSession(newSession);
    saveSession(newSession);
    setStep("wallet");

    try {
      await requestAirdrop(connection, keypair.publicKey.toBase58());
      setTimeout(async () => {
        const balance = await getBalance(
          connection,
          keypair.publicKey.toBase58(),
        );
        setSession((currentSession) => {
          if (!currentSession) return currentSession;
          const updated = { ...currentSession };
          updated.derivedWallets[0].balance = balance;
          saveSession(updated);
          return updated;
        });
        setAirdropMessage(
          "✓ Initial airdrop successful! You received 1 test SOL.",
        );
      }, 3000);
    } catch (e: any) {
      let msg = "Initial airdrop failed";
      if (e?.message) {
        if (e.message.includes("429") || e.message.includes("airdrop limit")) {
          msg =
            "Rate limit reached. Please use the 'Request 1 Test SOL' button or visit https://faucet.solana.com";
        }
      }
      setAirdropMessage(`✗ ${msg}`);
    }
  };

  const handleDeriveNewWallet = async () => {
    if (!session) return;
    const nextIndex = session.derivedWallets.length;
    const keypair = deriveKeypairFromMnemonic(session.mnemonic, nextIndex);
    const updated = {
      ...session,
      derivedWallets: [
        ...session.derivedWallets,
        {
          index: nextIndex,
          name: `Wallet ${nextIndex + 1}`,
          publicKey: keypair.publicKey.toBase58(),
          balance: 0,
        },
      ],
    };
    setSession(updated);
    saveSession(updated);
    setCurrentWalletIndex(nextIndex);
  };

  const handleRenameWallet = (index: number, newName: string) => {
    if (!session) return;
    const updated = { ...session };
    updated.derivedWallets[index].name = newName;
    setSession(updated);
    saveSession(updated);
  };

  const handleRemoveWallet = (index: number) => {
    if (!session || session.derivedWallets.length === 1) return;
    const updated = { ...session };
    updated.derivedWallets.splice(index, 1);
    setSession(updated);
    saveSession(updated);
    if (currentWalletIndex >= updated.derivedWallets.length) {
      setCurrentWalletIndex(updated.derivedWallets.length - 1);
    }
  };

  const handleLock = () => {
    if (!session) return;
    const locked = { ...session, locked: true };
    saveSession(locked);
    clearSession();
    setSession(null);
    setStep("name");
  };

  const handleAirdrop = async () => {
    if (!session || airdropping) return;
    setAirdropping(true);
    setAirdropMessage("");
    try {
      const wallet = session.derivedWallets[currentWalletIndex];
      const sig = await requestAirdrop(connection, wallet.publicKey);
      setAirdropMessage(
        `✓ Airdropped 1 SOL. Signature: ${sig.slice(0, 20)}...`,
      );
      setTimeout(() => refreshBalances(), 2000);
    } catch (e: any) {
      let msg = "Airdrop failed";
      if (e?.message) {
        if (e.message.includes("429") || e.message.includes("airdrop limit")) {
          msg =
            "Rate limit reached. Please try again later or visit https://faucet.solana.com to get airdrop instantly.";
        } else {
          msg = e.message;
        }
      }
      setAirdropMessage(`✗ ${msg}`);
    } finally {
      setAirdropping(false);
    }
  };
  const handleSendSOL = async () => {
    if (!session || !sendTo || !sendAmount) return;
    setSendError("");
    if (!validateSolanaAddress(sendTo)) {
      setSendError("Invalid Solana address");
      return;
    }
    const amount = parseFloat(sendAmount);
    if (isNaN(amount) || amount <= 0) {
      setSendError("Amount must be greater than 0");
      return;
    }
    const wallet = session.derivedWallets[currentWalletIndex];
    if (amount > wallet.balance) {
      setSendError("Insufficient balance");
      return;
    }

    setSending(true);
    try {
      const keypair = deriveKeypairFromMnemonic(
        session.mnemonic,
        currentWalletIndex,
      );

      const sig = await sendSOL(connection, keypair, sendTo, amount);
      const tx: TransactionRecord = {
        signature: sig,
        from: wallet.publicKey,
        to: sendTo,
        amount,
        timestamp: Date.now(),
        status: "confirmed",
      };
      const updated = {
        ...session,
        transactions: [tx, ...session.transactions],
      };
      setSession(updated);
      saveSession(updated);

      setShowSendModal(false);
      setSendTo("");
      setSendAmount("");
      setTimeout(() => {
        refreshBalances();
        refreshTransactions();
      }, 2000);
    } catch (e: any) {
      setSendError(e?.message || "Transaction failed");
    } finally {
      setSending(false);
    }
  };

  const currentWallet = session?.derivedWallets[currentWalletIndex];

  const getCurrentPrivateKey = (): string => {
    if (!session) return "";
    const keypair = deriveKeypairFromMnemonic(
      session.mnemonic,
      currentWalletIndex,
    );
    return bs58.encode(keypair.secretKey);
  };

  return (
    <PageShellWrapper>
      <ShellWrapper>
        <div className="w-full bg-background text-foreground font-mono">
          <div className="p-6 sm:p-8 md:p-10 text-center border-b-2 border-border">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
              Solana Test Wallet
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Create and manage your Solana Devnet wallets
            </p>
          </div>

          <div className="bg-red-600 text-white p-3 sm:p-4 text-center font-bold border-b-2 border-border text-xs sm:text-sm">
            ⚠️ DEVNET WALLET — NOT FOR REAL FUNDS — NO MAINNET SUPPORT — NO
            RECOVERY IF SEED PHRASE IS LOST — FUNDS ARE TEST-ONLY ⚠️
          </div>

          <div className="p-3 sm:p-4 border-b-2 border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
            <div className="text-sm sm:text-base">
              <span className="font-bold">Network:</span> Solana Devnet
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-sm sm:text-base">RPC:</span>
              <span className="text-xs break-all">{DEVNET_RPC}</span>
              <span
                className={`ml-2 inline-block w-3 h-3 ${
                  rpcHealthy ? "bg-green-600" : "bg-red-600"
                }`}
              />
            </div>
          </div>

          {step === "name" && (
            <div className="p-4 sm:p-6 md:p-8 border-2 border-border">
              <div className="mb-6 p-3 sm:p-4 border-2 border-border bg-muted-background">
                <h2 className="text-base sm:text-lg font-bold mb-2">
                  Test Wallet
                  <span className="ml-2 text-xs sm:text-sm font-normal">
                    [ comes with preloaded fund ]
                  </span>
                </h2>
                <p className="text-xs sm:text-sm mb-3 text-muted-foreground">
                  Load a pre-funded test wallet to try the send feature
                  immediately.
                </p>
                <button
                  onClick={() => {
                    setMnemonic(
                      "cool hawk season balcony ball pool prosper electric tonight snake panther alpha",
                    );
                    setWalletName("Test Wallet");
                    setSeedConfirmed(true);
                    setStep("seed");
                  }}
                  className="w-full sm:w-auto px-4 py-2 bg-primary text-primary-foreground border-2 border-border text-sm sm:text-base"
                >
                  Load Test Wallet
                </button>
              </div>

              <div className="text-center text-muted-foreground mb-4 text-sm">
                — OR —
              </div>

              <input
                type="text"
                value={walletName}
                onChange={(e) => setWalletName(e.target.value)}
                maxLength={30}
                placeholder="Enter wallet name (max 30 chars)"
                className="w-full p-2 sm:p-3 border-2 border-border bg-background text-foreground mb-4 text-sm sm:text-base"
              />
              <button
                onClick={handleCreateWallet}
                disabled={!walletName.trim() || walletName.length > 30}
                className="w-full sm:w-auto px-4 py-2 bg-primary text-primary-foreground border-2 border-border disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                Generate Seed Phrase
              </button>

              <div className="mt-8 space-y-6">
                <div className="border-2 border-border p-4 sm:p-6 bg-muted-background">
                  <h2 className="text-lg sm:text-xl font-bold mb-3">
                    How to Get Test SOL
                  </h2>
                  <div className="space-y-3 text-sm sm:text-base">
                    <p>
                      <strong>Method 1: In-App Airdrop</strong>
                    </p>
                    <ul className="ml-4 space-y-1 text-muted-foreground">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>
                          After creating your wallet, you'll receive 1 test SOL
                          automatically
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>
                          Use the "Request 1 Test SOL" button for additional
                          funds
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Rate limited to prevent abuse</span>
                      </li>
                    </ul>

                    <p className="mt-3">
                      <strong>Method 2: Solana Faucet Website</strong>
                    </p>
                    <ul className="ml-4 space-y-1 text-muted-foreground">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>
                          Visit{" "}
                          <a
                            href="https://faucet.solana.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-primary"
                          >
                            faucet.solana.com
                          </a>
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>
                          Paste your wallet address and request up to 5 SOL
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>No rate limits, instant delivery</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === "seed" && (
            <div className="p-4 sm:p-6 md:p-8 border-2 border-border">
              <div className="bg-destructive/10 border-2 border-destructive p-3 sm:p-4 mb-4 text-destructive font-bold text-xs sm:text-sm">
                ⚠️ This seed phrase is the ONLY way to recover your wallet. It
                will never be stored.
              </div>

              <div className="mb-4 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => setSeedRevealed(!seedRevealed)}
                  className="w-full sm:w-auto px-4 py-2 bg-primary text-primary-foreground border-2 border-border text-sm sm:text-base"
                >
                  {seedRevealed ? "Hide" : "Reveal"} Seed Phrase
                </button>
                {seedRevealed && (
                  <button
                    onClick={() => navigator.clipboard.writeText(mnemonic)}
                    className="w-full sm:w-auto px-4 py-2 bg-primary text-primary-foreground border-2 border-border text-sm sm:text-base"
                  >
                    Copy
                  </button>
                )}
              </div>

              {seedRevealed && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4 bg-muted p-3 sm:p-4 border-2 border-border">
                  {mnemonic.split(" ").map((word, i) => (
                    <div
                      key={i}
                      className="p-2 sm:p-3 bg-card border border-border text-center text-xs sm:text-sm"
                    >
                      {i + 1}. {word}
                    </div>
                  ))}
                </div>
              )}

              <label className="flex items-center gap-2 mb-4 cursor-pointer text-sm sm:text-base">
                <input
                  type="checkbox"
                  checked={seedConfirmed}
                  onChange={(e) => setSeedConfirmed(e.target.checked)}
                  className="w-4 h-4"
                />
                <span>I have safely stored my seed phrase</span>
              </label>

              <button
                onClick={handleConfirmSeed}
                disabled={!seedConfirmed}
                className="w-full sm:w-auto px-4 py-2 bg-primary text-primary-foreground border-2 border-border disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                Confirm & Create Wallet
              </button>
            </div>
          )}

          {step === "wallet" && session && currentWallet && (
            <div className="p-3 sm:p-4 md:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 pb-4 border-b-2 border-border gap-3 sm:gap-2">
                <h1 className="text-xl sm:text-2xl font-bold">
                  {session.name}
                </h1>
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  <button
                    onClick={async () => {
                      setRefreshing(true);
                      await refreshBalances();
                      setTimeout(() => setRefreshing(false), 1000);
                    }}
                    disabled={refreshing}
                    className="flex-1 sm:flex-none px-3 py-1 bg-primary text-primary-foreground border-2 border-border text-xs sm:text-sm disabled:opacity-50"
                  >
                    {refreshing ? "Refreshing..." : "Refresh Balances"}
                  </button>
                  <button
                    onClick={() => setShowSeedModal(true)}
                    className="flex-1 sm:flex-none px-3 py-1 bg-primary text-primary-foreground border-2 border-border text-xs sm:text-sm"
                  >
                    Show Seed Phrase
                  </button>
                  <button
                    onClick={handleLock}
                    className="flex-1 sm:flex-none px-3 py-1 bg-red-600 text-white border-2 border-border text-xs sm:text-sm"
                  >
                    Lock Wallet
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {session.derivedWallets.map((w, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentWalletIndex(i)}
                      className={`px-3 sm:px-4 py-2 border-2 border-border whitespace-nowrap text-sm sm:text-base ${
                        i === currentWalletIndex
                          ? "bg-primary text-primary-foreground"
                          : "bg-card text-card-foreground"
                      }`}
                    >
                      {w.name}
                    </button>
                  ))}
                  <button
                    onClick={handleDeriveNewWallet}
                    className="px-3 sm:px-4 py-2 border-2 border-border bg-card text-card-foreground whitespace-nowrap text-sm sm:text-base"
                  >
                    + New Wallet
                  </button>
                </div>
              </div>

              <div className="border-2 border-border p-3 sm:p-4 mb-4">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-2">
                  <div className="w-full sm:w-auto">
                    <input
                      type="text"
                      value={currentWallet.name}
                      onChange={(e) =>
                        handleRenameWallet(currentWalletIndex, e.target.value)
                      }
                      className="text-lg sm:text-xl font-bold bg-transparent border-b border-border w-full sm:w-auto"
                    />
                    <div className="text-xs text-muted-foreground">
                      Index: {currentWallet.index}
                    </div>
                  </div>
                  {session.derivedWallets.length > 1 && (
                    <button
                      onClick={() => handleRemoveWallet(currentWalletIndex)}
                      className="text-destructive text-xs sm:text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="bg-muted p-2 sm:p-3 border border-border mb-3 break-all text-xs sm:text-sm">
                  {currentWallet.publicKey}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(currentWallet.publicKey);
                      setCopiedAddress(true);
                      setTimeout(() => setCopiedAddress(false), 2000);
                    }}
                    disabled={copiedAddress}
                    className="flex-1 sm:flex-none text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 border border-border disabled:opacity-50"
                  >
                    {copiedAddress ? "✓ Copied!" : "Copy Address"}
                  </button>
                  <button
                    onClick={() => setShowPrivateKeyModal(true)}
                    className="flex-1 sm:flex-none text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 border border-border bg-card text-card-foreground"
                  >
                    Show Private Key
                  </button>
                </div>

                <div className="text-2xl sm:text-3xl font-bold mb-4">
                  {currentWallet.balance.toFixed(4)} SOL
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={handleAirdrop}
                    disabled={airdropping}
                    className="w-full sm:w-auto px-4 py-2 bg-primary text-primary-foreground border-2 border-border disabled:bg-gray-400 text-sm sm:text-base"
                  >
                    {airdropping ? "Requesting..." : "Request 1 Test SOL"}
                  </button>
                  <button
                    onClick={() => setShowSendModal(true)}
                    className="w-full sm:w-auto px-4 py-2 bg-primary text-primary-foreground border-2 border-border text-sm sm:text-base"
                  >
                    Send SOL
                  </button>
                </div>

                {airdropMessage && (
                  <div className="mt-3 text-xs sm:text-sm border border-border p-2 sm:p-3">
                    {airdropMessage}
                  </div>
                )}
              </div>

              {showSendModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-card border-4 border-border p-4 sm:p-6 max-w-md w-full">
                    <h2 className="text-lg sm:text-xl font-bold mb-4">
                      Send SOL
                    </h2>

                    <div className="mb-4">
                      <label className="block mb-1 font-bold text-sm sm:text-base">
                        To Address:
                      </label>
                      <input
                        type="text"
                        value={sendTo}
                        onChange={(e) => setSendTo(e.target.value)}
                        placeholder="Recipient address"
                        className="w-full p-2 border-2 border-border bg-background text-foreground text-sm"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block mb-1 font-bold text-sm sm:text-base">
                        Amount (SOL):
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={sendAmount}
                        onChange={(e) => setSendAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full p-2 border-2 border-border bg-background text-foreground text-sm"
                      />
                    </div>

                    {sendError && (
                      <div className="mb-4 text-destructive border-2 border-destructive p-2 text-xs sm:text-sm">
                        {sendError}
                      </div>
                    )}

                    <div className="mb-4 p-3 border-2 border-border bg-muted text-xs sm:text-sm">
                      <div className="mb-1">
                        <strong>From:</strong> {currentWallet.name}
                      </div>
                      <div className="mb-1 break-all">
                        <strong>To:</strong> {sendTo || "---"}
                      </div>
                      <div className="mb-1">
                        <strong>Amount:</strong> {sendAmount || "0"} SOL
                      </div>
                      <div className="mb-1">
                        <strong>Network:</strong> Devnet
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={handleSendSOL}
                        disabled={sending || !sendTo || !sendAmount}
                        className="flex-1 px-4 py-2 bg-primary text-primary-foreground border-2 border-border disabled:bg-gray-400"
                      >
                        {sending ? "Sending..." : "Confirm Send"}
                      </button>
                      <button
                        onClick={() => {
                          setShowSendModal(false);
                          setSendTo("");
                          setSendAmount("");
                          setSendError("");
                        }}
                        className="flex-1 px-4 py-2 bg-card text-card-foreground border-2 border-border text-sm sm:text-base"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-2 border-border p-3 sm:p-4 mb-4">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg sm:text-xl font-bold">
                    Transaction History
                  </h2>
                  <button
                    onClick={refreshTransactions}
                    disabled={loadingTransactions}
                    className="px-3 py-1 bg-primary text-primary-foreground border-2 border-border text-xs sm:text-sm disabled:opacity-50"
                  >
                    {loadingTransactions ? "Loading..." : "Refresh"}
                  </button>
                </div>

                {loadingTransactions && session.transactions.length === 0 ? (
                  <div className="text-muted-foreground text-center py-4 text-sm">
                    Loading transactions from blockchain...
                  </div>
                ) : session.transactions.length === 0 ? (
                  <div className="text-muted-foreground text-center py-4 text-sm">
                    No transactions found on blockchain
                  </div>
                ) : (
                  <div className="space-y-2">
                    {session.transactions.map((tx, i) => (
                      <div
                        key={i}
                        className="border border-border p-2 sm:p-3 text-xs sm:text-sm"
                      >
                        <div className="flex justify-between items-start mb-1 gap-2">
                          <span className="font-bold">
                            {tx.status === "confirmed"
                              ? "✓"
                              : tx.status === "failed"
                                ? "✗"
                                : "⏳"}{" "}
                            {tx.status.toUpperCase()}
                          </span>
                          <span className="text-xs">
                            {new Date(tx.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="mb-1">
                          <strong>From:</strong>{" "}
                          <span className="text-xs break-all">{tx.from}</span>
                        </div>
                        <div className="mb-1">
                          <strong>To:</strong>{" "}
                          <span className="text-xs break-all">{tx.to}</span>
                        </div>
                        <div className="mb-1">
                          <strong>Amount:</strong> {tx.amount} SOL
                        </div>
                        <div className="mb-1">
                          <strong>Signature:</strong>{" "}
                          <a
                            href={getExplorerLink(tx.signature)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs break-all underline"
                          >
                            {tx.signature}
                          </a>
                        </div>
                        {tx.error && (
                          <div className="text-destructive text-xs">
                            Error: {tx.error}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {showSeedModal && session && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-card border-4 border-border p-4 sm:p-6 max-w-2xl w-full">
                <h2 className="text-lg sm:text-xl font-bold mb-4">
                  Your Seed Phrase
                </h2>

                <div className="bg-destructive/10 border-2 border-destructive p-3 sm:p-4 mb-4 text-destructive font-bold text-xs sm:text-sm">
                  ⚠️ NEVER share this seed phrase with anyone. Anyone with this
                  phrase can access your wallet.
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4 bg-muted p-3 sm:p-4 border-2 border-border">
                  {session.mnemonic.split(" ").map((word, i) => (
                    <div
                      key={i}
                      className="p-2 sm:p-3 bg-card border border-border text-center text-xs sm:text-sm"
                    >
                      {i + 1}. {word}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(session.mnemonic);
                      setCopiedSeed(true);
                      setTimeout(() => setCopiedSeed(false), 2000);
                    }}
                    disabled={copiedSeed}
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground border-2 border-border disabled:opacity-50 text-sm sm:text-base"
                  >
                    {copiedSeed ? "✓ Copied!" : "Copy to Clipboard"}
                  </button>
                  <button
                    onClick={() => setShowSeedModal(false)}
                    className="flex-1 px-4 py-2 bg-card text-card-foreground border-2 border-border text-sm sm:text-base"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {showPrivateKeyModal && session && currentWallet && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-card border-4 border-border p-4 sm:p-6 max-w-2xl w-full">
                <h2 className="text-lg sm:text-xl font-bold mb-4">
                  Private Key - {currentWallet.name}
                </h2>

                <div className="bg-destructive/10 border-2 border-destructive p-3 sm:p-4 mb-4 text-destructive font-bold text-xs sm:text-sm">
                  ⚠️ NEVER share this private key with anyone. Anyone with this
                  key can access THIS specific wallet.
                </div>

                <div className="bg-muted p-3 sm:p-4 border-2 border-border mb-4 break-all font-mono text-xs sm:text-sm">
                  {getCurrentPrivateKey()}
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(getCurrentPrivateKey());
                      setCopiedPrivateKey(true);
                      setTimeout(() => setCopiedPrivateKey(false), 2000);
                    }}
                    disabled={copiedPrivateKey}
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground border-2 border-border disabled:opacity-50 text-sm sm:text-base"
                  >
                    {copiedPrivateKey ? "✓ Copied!" : "Copy to Clipboard"}
                  </button>
                  <button
                    onClick={() => setShowPrivateKeyModal(false)}
                    className="flex-1 px-4 py-2 bg-card text-card-foreground border-2 border-border text-sm sm:text-base"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </ShellWrapper>
    </PageShellWrapper>
  );
}
