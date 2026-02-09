

exports.calculateCart = (cartDetails)=>{
   
    try{

        let cartSubTotal=0,cartTotal=0,taxTotal=0,itemsCount=0,discountTotal= 0;

        cartDetails.products.forEach(product=>{

            cartSubTotal += product.productId.defaultPrice*product.quantity
            taxTotal += parseInt(product.productId.isTaxEnabled)===1?product.productId.defaultPrice*0.08*product.quantity : 0
            console.log(parseInt(product.productId.isTaxEnabled))
            itemsCount += 1
            discountTotal += product.productId.defaultPrice*product.productId.discount*0.01*product.quantity;
           
        })
        cartTotal = cartSubTotal +taxTotal - discountTotal

        cartDetails = cartDetails.toObject();

        cartDetails.cartSubTotal = cartSubTotal
        cartDetails.taxTotal = taxTotal
        cartDetails.itemsCount = itemsCount
        cartDetails.discountTotal = discountTotal
        cartDetails.cartTotal = cartTotal

        return cartDetails

    }catch(err){
         console.log(err)
         return
    }

}