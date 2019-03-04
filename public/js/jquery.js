$('button.edit-ingredient').on('click', function(e) {
    e.preventDefault();
    var parentLi = $(this).parent().parent();
    var liId = parentLi.attr('id');
    var ingredientSelector = "p#ingredient" + liId;
    var measurementSelector = "p#measurement" + liId;
    var qtySelector = "p#qty" + liId;
    var ingredient = $(ingredientSelector).html();
    var measurement = $(measurementSelector).html();
    var qty = $(qtySelector).html();
    parentLi.html(`<form action="/ingredient/${liId}?_method=PUT" method="post">
                        <input type="text" name="ingredient[ingredient]" value="${ingredient}">
                        <select name="ingredient[measurement]">
                                <option value="measure" selected disabled>${measurement}</option>
                                <option value="tsp">tsp</option>
                                <option value="tbsp">tbsp</option>
                                <option value="cups">cups</option>
                        </select>
                        <select name="ingredient[qty]">
                                <option value="qty" selected disabled>${qty}</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                        </select>
                        <button>save</button>
                    </form>`);
    console.log(liId);
    console.log(ingredient);
    console.log(measurement);
    console.log(qty);
});