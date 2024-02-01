import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { usePrivyEthersProvider } from "~~/hooks/scaffold-eth/usePrivyEthersProvider";
import { notification } from "~~/utils/scaffold-eth";


interface Props {
  isOpen: boolean;
  onClose: (isClose: boolean) => void;
  domain?: any;
  types?: any;
  data?: any;
}

const SignModal: React.FC<Props> = ({ isOpen, onClose, domain, types, data }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { privyEthersProvider } = usePrivyEthersProvider();

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  // The function to sign the data
  const _typeDataSignMessage = async () => {
    try {
      const signature = await privyEthersProvider._signTypedData(domain, types, data);
      console.log("712sig:", signature);
    } catch (e) {
      console.log("ERR_712_SIGN", e);
    }
  };

  // const renderData = (data: any) => {
  //   return <code className="p-2 bg-gray-100 rounded">{JSON.stringify(data, null, 2)}</code>;
  // };

  return (
    <>
      <Modal
        title="Sign Typed Data"
        style={{ top: 20 }}
        open={modalOpen}
        onOk={() => {
          _typeDataSignMessage();
          setModalOpen(false);
          onClose(true);
        }}
        onCancel={() => {
          notification.error("User rejected the request.");
          setModalOpen(false);
          onClose(true);
        }}
      >
        <div className="container mx-auto p-4">
          <p className="text-lg mb-4">You are about to sign a message with the following data:</p>
          <div className="">
            {/* <div className="">
              <h2 className="text-xl font-semibold mb-2">Domain</h2>
              {renderData(domain)}
            </div> */}
            <div className="col-span-1">
              <textarea
                value={JSON.stringify({ domain, types, data }, null, 2)}
                className="w-full bg-slate-700 text-slate-50 font-mono p-4 text-xs sm:text-sm rounded-md mt-2"
                rows={20}
                disabled
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SignModal;