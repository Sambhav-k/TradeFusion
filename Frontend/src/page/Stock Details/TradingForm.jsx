import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAssetDetails } from "@/State/Asset/Action";
import { payOrder } from "@/State/Order/Action";
import { getUserWallet } from "@/State/Wallet/Action";
import { DialogClose } from "@radix-ui/react-dialog";
import { DotIcon } from "@radix-ui/react-icons";
import { DollarSign } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TradingForm = () => {
  const { coin, asset, wallet, order } = useSelector((store) => store);
  const [quantity, setQuantity] = useState(0);
  const [amount, setAmount] = useState(0);
  const [orderType, setOrderType] = useState("BUY");
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const input = parseFloat(e.target.value);

    const price = coin.coinDetails?.market_data?.current_price?.usd || 0;

    if (orderType === "BUY") {
      setAmount(input);
      const volume = calculateBuyCost(input, price);
      setQuantity(volume);
    } else {
      setQuantity(input);
      const total = input * price;
      setAmount(total.toFixed(2));
    }
  };

  function calculateBuyCost(amountUSD, cryptoPrice) {
    if (!cryptoPrice) return 0;

    let volume = amountUSD / cryptoPrice;
    let decimalPlaces = Math.max(
      2,
      cryptoPrice.toString().split(".")[0].length
    );
    return parseFloat(volume.toFixed(decimalPlaces));
  }

  const handleBuyCrypto = async () => {
    const jwt = localStorage.getItem("jwt");

    console.log("ORDER TYPE:", orderType);
    console.log("AMOUNT:", amount);
    console.log("QUANTITY:", quantity);
    console.log("COIN ID:", coin.coinDetails?.id);

    await dispatch(
      payOrder({
        jwt,
        amount,
        orderData: {
          coinId: coin.coinDetails?.id,
          quantity,
          orderType,
        },
      })
    );

    dispatch(getUserWallet(jwt));
    dispatch(getAssetDetails({ coinId: coin.coinDetails?.id, jwt }));
  };

  return (
    <div className="space-y-10 p-5">
      <div>
        <div className="flex gap-4 items-center justify-between">
          <Input
            className="py-7 focus:outline-none"
            placeholder={
              orderType === "BUY"
                ? "Enter USD amount..."
                : "Enter quantity to sell..."
            }
            onChange={handleOnChange}
            type="number"
          />
          <div>
            <p className="border text-2xl flex justify-center items-center w-36 h-14 rounded-md">
              {quantity}
            </p>
          </div>
        </div>

        {orderType === "SELL" && quantity > asset.assetDetails?.quantity && (
          <h1 className="text-red-800 text-center pt-4">
            Insufficient quantity to sell
          </h1>
        )}

        {orderType === "BUY" &&
          quantity * coin.coinDetails?.market_data?.current_price?.usd >
            wallet.userWallet?.balance && (
            <h1 className="text-red-800 text-center pt-4">
              Insufficient Wallet Balance To Buy
            </h1>
          )}
      </div>

      <div className="flex gap-5 items-center">
        <div>
          <Avatar>
            <AvatarImage src={coin.coinDetails?.image?.large} />
          </Avatar>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p>{coin.coinDetails?.symbol?.toUpperCase()}</p>
            <DotIcon className="text-gray-400" />
            <p className="text-gray-400">{coin.coinDetails?.name}</p>
          </div>
          <div className="flex items-end gap-2">
            <p className="text-xl font-bold">
              {coin.coinDetails?.market_data?.current_price?.usd}
            </p>
            <p
              className={`${
                coin.coinDetails?.market_data?.market_cap_change_24h < 0
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              <span>
                {coin.coinDetails?.market_data?.market_cap_change_24h}
              </span>
              <span>
                (
                {
                  coin.coinDetails?.market_data
                    ?.market_cap_change_percentage_24h
                }
                %)
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p>Order Type</p>
        <p>Market Order</p>
      </div>
      <div className="flex items-center justify-between">
        <p>{orderType === "BUY" ? "Available Cash" : "Available Quantity"}</p>
        <div>
          {orderType === "BUY" ? (
            <div className="flex items-center">
              <DollarSign />
              <span className="text-2xl font-semibold">
                {wallet.userWallet?.balance}
              </span>
            </div>
          ) : (
            <p>{asset.assetDetails?.quantity || 0}</p>
          )}
        </div>
      </div>

      <div>
        <DialogClose className="w-full">
          <Button
            onClick={handleBuyCrypto}
            className={`w-full py-6 ${
              orderType === "SELL" ? "bg-red-600 text-white" : ""
            }`}
            disabled={
              quantity === 0 ||
              (orderType === "SELL" &&
                quantity > asset.assetDetails?.quantity) ||
              (orderType === "BUY" &&
                quantity * coin.coinDetails?.market_data?.current_price?.usd >
                  wallet.userWallet?.balance)
            }
          >
            {orderType}
          </Button>
        </DialogClose>

        <Button
          onClick={() => setOrderType(orderType === "BUY" ? "SELL" : "BUY")}
          className="w-full mt-5 text-xl"
          variant="link"
        >
          {orderType === "BUY" ? "Or Sell" : "Or Buy"}
        </Button>
      </div>
    </div>
  );
};

export default TradingForm;
