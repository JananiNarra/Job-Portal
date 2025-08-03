import React, { useState } from "react";
import { ethers } from "ethers";

const WalletConnect = ({ onPaymentSuccess }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const adminWallet = "0xBdb7ceFD8E917E23854D11226A672Ba9b480989A"; // replace with your testnet wallet

  // ✅ Connect wallet only once
  const connectWallet = async () => {
    if (!window.ethereum) {
      return setStatus("MetaMask not detected. Please install it.");
    }
    if (loading) return; // block double-click

    try {
      setLoading(true);
      setStatus("⏳ Requesting wallet connection...");

      // Request wallet access
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setWalletAddress(address);
      setStatus("✅ Wallet connected successfully");
    } catch (error) {
      console.error("Wallet connect error:", error);
      setStatus("❌ Wallet connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Send payment
  const makePayment = async () => {
    if (!walletAddress) {
      return setStatus("⚠️ Connect wallet first.");
    }
    if (loading) return;

    try {
      setLoading(true);
      setStatus("⏳ Submitting transaction...");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const tx = await signer.sendTransaction({
        to: adminWallet,
        value: ethers.parseEther("0.001"), // 0.001 ETH
      });

      setStatus("⏳ Waiting for confirmation...");
      await tx.wait();

      setStatus("✅ Payment successful!");
      onPaymentSuccess(walletAddress);
    } catch (error) {
      console.error("Payment error:", error);
      setStatus("❌ Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg text-center">
      <h2 className="text-xl font-bold text-purple-700 mb-4">
        Blockchain Payment 💳
      </h2>

      <div className="flex justify-center gap-4">
        <button
          onClick={connectWallet}
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-white font-semibold ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {loading ? "Processing..." : "Connect Wallet"}
        </button>

        <button
          onClick={makePayment}
          disabled={!walletAddress || loading}
          className={`px-4 py-2 rounded-lg text-white font-semibold ${
            !walletAddress || loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Processing..." : "Pay Fee (0.001 ETH)"}
        </button>
      </div>

      {status && <p className="mt-4 text-sm">{status}</p>}
      {walletAddress && (
        <p className="mt-2 text-xs text-gray-500">
          Connected Wallet: {walletAddress}
        </p>
      )}
    </div>
  );
};

export default WalletConnect;
