document.addEventListener('DOMContentLoaded', () => {
    let shopCardPageMain = document.querySelector('.main--shop-card');

    if(shopCardPageMain) {
        const ratingItemList = document.querySelectorAll('.star-rating__item');
        const ratingItemsArray = Array.prototype.slice.call(ratingItemList);

        ratingItemsArray.forEach(item =>
            item.addEventListener('click',() => {
                const {itemValue} = item.dataset;
                item.parentNode.dataset.totalValue = itemValue;
                console.log(itemValue); //to send to back-end
            })
        );
    };
});



