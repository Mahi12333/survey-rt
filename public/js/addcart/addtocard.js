
		document.addEventListener('DOMContentLoaded', () => {
			try {
				fetch('/api/addTocart', {
					method: 'GET',

				})
				.then(response => {
					if (!response.ok) {
						throw new Error('Failed to add product to cart');
					}
					return response.json();
				})
				.then(data => {
					const cartItemCountSpan = document.getElementById('cartItemCount');
                    const cartItemIds = data.cartItems; 
                    const cartItemsInput = document.getElementById('cartItems');
                    cartItemsInput.value = JSON.stringify(cartItemIds); 
			if (cartItemCountSpan) {
				if(data.cartItems[0].cartItems){
					cartItemCountSpan.innerText =  data.cartItems[0].cartItems.length.toString();
				}else{
					cartItemCountSpan.innerText =  data.cartItems.length.toString();
				}
				
			}
				})
				.catch(error => {
					console.error("Error", error);
				});
			} catch (error) {
				console.log("error", error);
			}
			
		});


        $(document).ready(function() {
            $('.cart').on('click', function(e) {
                e.preventDefault();
                const cartItemsInput = $('#cartItems');
                const cartItemIds = JSON.parse(cartItemsInput.val());
                try {
                    fetch('/api/cardProduct',{
                        method:"POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ cartItemIds: cartItemIds }),
                    });
                    //const result=response.json();
                   // console.log(result);
                } catch (error) {
                    console.log("error", error);
                }
            });
        });
        
        
	
	