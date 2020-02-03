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
        if(this.amount > this.getItemData().cap){
            this.amount = this.getItemData().cap;
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
        if(canRemoveAmount(amount)){
            this.amount -= amount;
            return true;
        }
        return false;
    }

    get cap(){
        return this.getItemData().cap;
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
    itemText += "Item Cap: " + itemData[itemID].cap;

    itemText += "</li>";
    return itemText;
}

//Adds a given amount to a given item.
function addItemToInventory(item, amount){
    if(items[item] == null){
        items[item] = new Item(item);
    }
    items[item].addAmount(amount);
    displayInventory();
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