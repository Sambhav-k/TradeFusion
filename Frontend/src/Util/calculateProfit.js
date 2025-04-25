export const calculateProfit=(order)=>{
    if(order && order.orderItem && order.orderItem.buyPrice && order.orderItem.sellPrice){
        return order.orderItem.sellPrice-order.orderItem.buyPrice;
   }
   return "-"
}