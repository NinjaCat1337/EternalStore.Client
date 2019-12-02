const state = {
    orderItems: []
};

const getters = {
    orderItems(state) {
        return state.orderItems;
    },
    haveItemsInOrder(state) {
        return state.orderItems.length > 0;
    },
    totalPrice(state){
        var totalPrice = 0;
        state.orderItems.forEach(function(item) {
            totalPrice += item.qty * item.price;
          });

          return totalPrice;
    }
};

const mutations = {
    addProductToCart(state, product) {
        state.orderItems.push(product);
    },
    incrementQty(state, index){
        var newElement = state.orderItems[index];
        newElement.qty++;
        state.orderItems.splice(index, 1, newElement)
    },
    decrementQty(state, index){
        var newElement = state.orderItems[index];
        newElement.qty--;
        state.orderItems.splice(index, 1, newElement)
    },
    removeItem(state, index){
        state.orderItems.splice(index, 1);
    }
};

const actions = {
    addProductToCart({ commit }, product) {
        var productIsInCart = state.orderItems.find(e => e.idProduct === product.idProduct);
        if (productIsInCart) {
            state.orderItems[state.orderItems.indexOf(productIsInCart)].qty++;
        }
        else {
            product.qty = 1;
            commit('addProductToCart', product);
            localStorage.setItem("cart", state.orderItems)
        }
    },
    incrementQty({commit}, index){
        commit('incrementQty', index);
    },
    decrementQty({commit}, index){
        commit('decrementQty', index);
    },
    removeItem({commit}, index){
        commit('removeItem', index);
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};