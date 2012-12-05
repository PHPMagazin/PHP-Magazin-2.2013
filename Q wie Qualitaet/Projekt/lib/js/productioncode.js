/*
 * Funktion zur erzeugung eines Listeneintrags auf der Webseite
 */
var createItemTags = function(listItem){
    var tag = '<div id="'+listItem.id+'" class="unchecked_listitem item_odd'
             +'  listitem">'+listItem.itemname+'<button class="del" id="'
             +listItem.id+'_del">löschen</button><button class="check" id="'
             +listItem.id+'_check">erledigt</button></div>';
    return tag;
}

/*
 * Funktion hebt die CSS-Klassen-Zuordnung even/odd auf.
 * Diese Funktin wird benötigt, sobald Listenelemente gelöscht oder hinzugefügt 
 * werden.
 */
var removeEvenOddLayout = function(){
    $(".item_even").removeClass("item_even");
    $(".item_odd").removeClass("item_odd");
}

/*
 * Funktion setzt die CSS-Klassen-Zuordnung even/odd neu.
 * Diese Funktin wird benötigt, sobald Listenelemente gelöscht oder hinzugefügt 
 * werden.
 */
var addEvenOddLayout =function(){
    $(".listitem:even").addClass("item_even");
    $(".listitem:odd").addClass("item_odd");
}

/*
 * Diese Funktion entfernt das Item mit der übergebenen itemID aus der Liste
 * und setzt die CSS-Klassen-Zuordnung even/odd neu.
 */
var removeItem = function(itemId){
    $("#"+itemId).remove();
    removeEvenOddLayout();
    addEvenOddLayout();
}

/*
 * Diese Funktion fügt das übergebene Listitem der Todoliste auf der Webseite 
 * hinzu und setzt die CSS-Klassen-Zuordnung even/odd neu.
 */
var addItem = function(listItem){
    var itemTags = createItemTags(listItem);
    $("#item-list").append(itemTags)
    removeEvenOddLayout();
    addEvenOddLayout();
}