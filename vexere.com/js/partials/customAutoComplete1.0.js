//Autocomplete stat city
$.widget("custom.catcomplete", $.ui.autocomplete, {
    
    _renderMenu: function (ul, items) {
        
        var that = this,
            currentCategory = "";
        items = items.sort(function (a, b) {
            if (a.Category < b.Category) {
                return 1;
            }
            if (a.Category > b.Category) {
                return -1;
            }
            return 0;
        });
        $.each(items, function (index, item) {
            if (item.Category != currentCategory) {
                ul.append("<li class='ui-autocomplete-category' style=font-weight:bold;>" + item.Category + "</li>");
                currentCategory = item.Category;
            }
            that._renderItemData(ul, item);
        });
    }
});
