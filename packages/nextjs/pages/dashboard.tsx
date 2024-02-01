import { useEffect, useState } from "react";
// import Link from "next/link";
import { useRouter } from "next/router";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import SignModal from "~~/components/SignModal";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";


const Dashboard: NextPage = () => {
  const router = useRouter();
  const { wallets } = useWallets();
  const embeddedWallet = wallets.find(wallet => wallet.walletClientType === "privy");
  const { targetNetwork } = useTargetNetwork();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    ready,
    authenticated,
    user,
    logout,
    linkEmail,
    linkWallet,
    unlinkEmail,
    linkPhone,
    unlinkPhone,
    unlinkWallet,
    linkGoogle,
    unlinkGoogle,
    linkTwitter,
    unlinkTwitter,
    linkDiscord,
    unlinkDiscord,
    signMessage,
  } = usePrivy();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/");
    }
  }, [ready, authenticated, router]);

  const numAccounts = user?.linkedAccounts?.length || 0;
  const canRemoveAccount = numAccounts > 1;

  const email = user?.email;
  const phone = user?.phone;
  const wallet = user?.wallet;

  const googleSubject = user?.google?.subject || null;
  const twitterSubject = user?.twitter?.subject || null;
  const discordSubject = user?.discord?.subject || null;
  // Replace this with the message you'd like your user to sign
  const message = "Hello world";
  // Replace this with the text you'd like on your signature modal,
  // if you do not have `noPromptsOnSignature` enabled
  const uiConfig = {
    title: "Sign Message",
    description: "This is a test message, nothing to see here... \nSign the message below: ",
    buttonText: "Sign message ",
  };

  const _personalSignMessage = async (message: string) => {
    const signature = await signMessage(message, uiConfig);
    console.log("sig:", signature);
  };

  // All properties on a domain are optional
  const domain = {
    name: "Scaffold ETH 2",
    version: "1",
    chainId: targetNetwork.id,
    verifyingContract: "0x0000000000000000000000000000000000000000",
  };

  // The named list of all type definitions
  const types = {
    Person: [
      { name: "name", type: "string" },
      { name: "wallet", type: "address" },
    ],
    Mail: [
      { name: "from", type: "Person" },
      { name: "to", type: "Person" },
      { name: "contents", type: "string" },
    ],
  };

  // The data to sign
  const value = {
    from: {
      name: "Cow",
      wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
    },
    to: {
      name: "Bob",
      wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
    },
    contents: "Hello, Bob!",
  };

  const closeModal = (isClosed: boolean) => {
    if (isClosed) setIsModalOpen(false);
  };
  const _typeDataSignMessage = async () => {
    try {
      setIsModalOpen(true);
    } catch (e) {
      console.log("ERR_712_SIGN", e);
    }
  };

  return (
    <>
      <SignModal isOpen={isModalOpen} domain={domain} data={value} types={types} onClose={closeModal} />
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow">
        <div className="flex-grow bg-base-300 w-full px-8 py-12">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
          </h1>
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center  rounded-3xl">
              {ready && authenticated && (
                <>
                  <div className="flex flex-row justify-between">
                    <h1 className="text-2xl font-semibold">Privy Auth Demo</h1>
                    <button
                      onClick={logout}
                      className="ml-5 text-sm bg-violet-200 hover:text-violet-900 py-2 px-4 rounded-md text-violet-700"
                    >
                      Logout
                    </button>
                  </div>
                  {embeddedWallet && (
                    <div className="flex flex-row justify-between mt-5">
                      <h1 className="text-2xl font-semibold">Wallet Address</h1>
                      <div className="ml-5 text-sm bg-violet-200 hover:text-violet-900 py-2 px-4 rounded-md text-violet-700">
                        {embeddedWallet.address}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-row justify-between mt-5">
                    <h1 className="text-2xl font-semibold"> EIP-191 Personal Sign</h1>
                    <button
                      onClick={() => {
                        _personalSignMessage(message);
                      }}
                      className="ml-5 text-sm border border-violet-600 hover:border-violet-700 py-2 px-4 rounded-md text-violet-600 hover:text-violet-700 disabled:border-gray-500 disabled:text-gray-500 hover:disabled:text-gray-500"
                      disabled={false}
                    >
                      Sign
                    </button>
                  </div>
                  <div className="flex flex-row justify-between mt-5">
                    <h1 className="text-2xl font-semibold"> EIP-712 typed data sign </h1>
                    <button
                      disabled={!embeddedWallet}
                      onClick={() => {
                        _typeDataSignMessage();
                      }}
                      className="ml-5 text-sm border border-violet-600 hover:border-violet-700 py-2 px-4 rounded-md text-violet-600 hover:text-violet-700 disabled:border-gray-500 disabled:text-gray-500 hover:disabled:text-gray-500"
                    >
                      Sign
                    </button>
                  </div>
                  <div className="mt-12 flex gap-4 flex-wrap">
                    {googleSubject ? (
                      <button
                        onClick={() => {
                          unlinkGoogle(googleSubject);
                        }}
                        className="text-sm border border-violet-600 hover:border-violet-700 py-2 px-4 rounded-md text-violet-600 hover:text-violet-700 disabled:border-gray-500 disabled:text-gray-500 hover:disabled:text-gray-500"
                        disabled={!canRemoveAccount}
                      >
                        Unlink Google
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          linkGoogle();
                        }}
                        className="text-sm bg-violet-600 hover:bg-violet-700 py-2 px-4 rounded-md text-white"
                      >
                        Link Google
                      </button>
                    )}

                    {twitterSubject ? (
                      <button
                        onClick={() => {
                          unlinkTwitter(twitterSubject);
                        }}
                        className="text-sm border border-violet-600 hover:border-violet-700 py-2 px-4 rounded-md text-violet-600 hover:text-violet-700 disabled:border-gray-500 disabled:text-gray-500 hover:disabled:text-gray-500"
                        disabled={!canRemoveAccount}
                      >
                        Unlink Twitter
                      </button>
                    ) : (
                      <button
                        className="text-sm bg-violet-600 hover:bg-violet-700 py-2 px-4 rounded-md text-white"
                        onClick={() => {
                          linkTwitter();
                        }}
                      >
                        Link Twitter
                      </button>
                    )}

                    {discordSubject ? (
                      <button
                        onClick={() => {
                          unlinkDiscord(discordSubject);
                        }}
                        className="text-sm border border-violet-600 hover:border-violet-700 py-2 px-4 rounded-md text-violet-600 hover:text-violet-700 disabled:border-gray-500 disabled:text-gray-500 hover:disabled:text-gray-500"
                        disabled={!canRemoveAccount}
                      >
                        Unlink Discord
                      </button>
                    ) : (
                      <button
                        className="text-sm bg-violet-600 hover:bg-violet-700 py-2 px-4 rounded-md text-white"
                        onClick={() => {
                          linkDiscord();
                        }}
                      >
                        Link Discord
                      </button>
                    )}

                    {email ? (
                      <button
                        onClick={() => {
                          unlinkEmail(email.address);
                        }}
                        className="text-sm border border-violet-600 hover:border-violet-700 py-2 px-4 rounded-md text-violet-600 hover:text-violet-700 disabled:border-gray-500 disabled:text-gray-500 hover:disabled:text-gray-500"
                        disabled={!canRemoveAccount}
                      >
                        Unlink email
                      </button>
                    ) : (
                      <button
                        onClick={linkEmail}
                        className="text-sm bg-violet-600 hover:bg-violet-700 py-2 px-4 rounded-md text-white"
                      >
                        Connect email
                      </button>
                    )}

                    {wallet ? (
                      <button
                        onClick={() => {
                          unlinkWallet(wallet.address);
                        }}
                        className="text-sm border border-violet-600 hover:border-violet-700 py-2 px-4 rounded-md text-violet-600 hover:text-violet-700 disabled:border-gray-500 disabled:text-gray-500 hover:disabled:text-gray-500"
                        disabled={!canRemoveAccount}
                      >
                        Unlink wallet
                      </button>
                    ) : (
                      <button
                        onClick={linkWallet}
                        className="text-sm bg-violet-600 hover:bg-violet-700 py-2 px-4 rounded-md text-white border-none"
                      >
                        Connect wallet
                      </button>
                    )}

                    {phone ? (
                      <button
                        onClick={() => {
                          unlinkPhone(phone.number);
                        }}
                        className="text-sm border border-violet-600 hover:border-violet-700 py-2 px-4 rounded-md text-violet-600 hover:text-violet-700 disabled:border-gray-500 disabled:text-gray-500 hover:disabled:text-gray-500"
                        disabled={!canRemoveAccount}
                      >
                        Unlink phone
                      </button>
                    ) : (
                      <button
                        onClick={linkPhone}
                        className="text-sm bg-violet-600 hover:bg-violet-700 py-2 px-4 rounded-md text-white border-none"
                      >
                        Connect phone
                      </button>
                    )}
                  </div>

                  <p className="mt-6 font-bold uppercase text-sm text-gray-600">User object</p>
                  <textarea
                    value={JSON.stringify(user, null, 2)}
                    className="w-full bg-slate-700 text-slate-50 font-mono p-4 text-xs sm:text-sm rounded-md mt-2"
                    rows={20}
                    disabled
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;