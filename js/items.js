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
        items[item] = {};
        items[item].amount = amount;
    }else{
        items[item].amount += amount;
    }

    if(items[item].amount > itemData[item].cap){
        currentAction.messages.push("Itemcap reached.");
        items[item].amount = itemData[item].cap;
    }
    displayInventory();
}

//Checks to see if an item can be removed from the inventory. Returns true if successful and false if not.
function canRemoveFromInventory(itemID, amount){
    if(items[itemID] != null){
        if(items[itemID].amount >= amount){
            return true;
        }
    }
    return false;
}

//Removes an item from the inventory. Returns true if successful and false if not.
function removeFromInventory(itemID, amount){
    if(items[itemID] != null){
        if(items[itemID].amount >= amount){
            items[itemID].amount -= amount;
            return true;
        }
    }
    return false;
}

//Display the user's inventory.
function displayInventory(){
    let invText = "";

    for(item in items){
        invText += "<li>" + items[item].amount + "/" + itemData[item].cap + " " + i18next.t("items." + item + ".name") + "</li>";
    }

    $("#inventory").html(invText);
}