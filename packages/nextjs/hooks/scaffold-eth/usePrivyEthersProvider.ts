import { useEffect, useState } from "react";
import { useWallets } from "@privy-io/react-auth";

export function usePrivyEthersProvider() {
  const { wallets } = useWallets();
  const embeddedWallet = wallets.find(wallet => wallet.walletClientType === "privy");
  const [privyEthersProvider, setPrivyEthersProvider] = useState<any>({});

  useEffect(() => {
    if (!embeddedWallet) return;
    const readyEthersProvider = async () => {
      const provider = await embeddedWallet.getEthersProvider();
      const signer = provider.getSigner();
      setPrivyEthersProvider(signer);
    };
    readyEthersProvider();
  }, [embeddedWallet]);

  return { privyEthersProvider };
}
