//Class which contains all the item data pertaining to the save.
class Item{
    constructor(id){
        this.id = id;
        this.amount = 0;
    }

    //Get the relevant item data.
    getItemData(){
        return itemData[this.id];
    }

    //Add the given amount to the item inventory.
    addAmount(amount){
        this.amount += amount;
        if(this.amount > this.cap){
            this.amount = this.cap;
        }
    }

    //Checks to see if a given amount of the item can be removed from the inventory.
    canRemoveAmount(amount){
        if(this.amount >= amount){
            return true;
        }
        return false;
    }

    //Removes the given amount of the item from the inventory if possible.
    removeAmount(amount){
        if(this.canRemoveAmount(amount)){
            this.amount -= amount;
            return true;
        }
        return false;
    }

    //Get the item cap of the item.
    get cap(){
        if(itemCapModifiers[this.category] != null){
            return Math.floor(this.getItemData().cap * (1 + itemCapModifiers[this.category]));
        }
        return this.getItemData().cap;
    }

    //Get the item category.
    get category(){
        return this.getItemData().category;
    }
}

//Displays the items in the items tab.
function showItems(){
    console.log("---Showing Items---");
    let itemText = "<ul>";

    for(item in itemData){
        itemText += getItemText(item);
    }

    itemText += "</ul>";
    $("#itemlist").html(itemText);
}

//Returns the item text for a given item.
function getItemText(itemID){
    console.log(itemID);
    let itemText = "<li>";

    itemText += "<b>" + i18next.t("items." + itemID + ".name") + "</b><br />";
    itemText += i18next.t("items." + itemID + ".desc") + "<br />";
    itemText += i18next.t("general.itemCap") + ": " + itemData[itemID].cap;

    itemText += "</li>";
    return itemText;
}

//Adds a given amount to a given item.
function addItemToInventory(item, amount){
    if(items[item] == null){
        items[item] = new Item(item);
    }
    items[item].addAmount(amount);
}

//Checks to see if an item can be removed from the inventory. Returns true if successful and false if not.
function canRemoveFromInventory(itemID, amount){
    if(items[itemID] != null){
        return items[itemID].canRemoveAmount(amount);
    }
    return false;
}

//Removes an item from the inventory. Returns true if successful and false if not.
function removeFromInventory(itemID, amount){
    if(items[itemID] != null){
        return items[itemID].removeAmount(amount);
    }
    return false;
}

//Display the user's inventory.
function displayInventory(){
    let invText = "";

    for(item in items){
        invText += "<li>" + items[item].amount + "/" + items[item].cap + " " + i18next.t("items." + item + ".name") + "</li>";
    }

    $("#inventory").html(invText);
}