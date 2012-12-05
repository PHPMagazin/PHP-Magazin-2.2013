var persistence = new Persistence();

test( "BusinessClass TodoList Konstruktor Test", function() {
    //Initialisierung des tests
    var name = "Allgemein";
    var todoList1 = new TodoList(name);
    
    //Durchführung des Tests (Auswertung der Annahmen)
    ok(name == todoList1.listname, "Der Name des erzeugten Objekts muss dem Konstruktornamen entsprechen");
});

test( "BusinessClass TodoListItem Konstruktor Test", function() {
    //Initialisierung des tests
    var name = "Item 01";
    var id = "01";
    var todoListItem = new TodoListItem(name,id);
    
    //Durchführung des Tests (Auswertung der Annahmen)
    ok(name == todoListItem.itemname, "der Name des erzeugten Objekts muss dem Konstruktornamen entsprechen");
    ok(id == todoListItem.id, "die ID des erzeugten Objekts muss der Konstruktorid entsprechen");
    
});

test("Businessclass TodoList function Test", function(){
    //Initialisierung des tests
    var listname = "Allgemein";
    var todoList = new TodoList(listname);
    for(var i = 0;i<10;i++){
        todoList.addListItem(new TodoListItem("itemname "+i,i));
    }
    
    //Durchführung des Tests (Auswertung der Annahmen)
    ok(todoList.listitems.length == 10, "Die 10 hinzugefügten Items müssen auch in der TodoList auftauchen");
    for(var i = 0;i<10;i++){
        ok(todoList.listitems[i].itemname == "itemname "+i, "Überprüfung der Itemnames");
        ok(todoList.listitems[i].checked == false, "Alle TodoListItems müssen mit checked = false initialisiert sein.");
    }
});

test( "PersistenceMock getTest", function() {
    //Initialisierung des tests
    var expectedNames = ["Allgemein","Arbeit","Familie","Artikel","Karriere"];
    var names = persistence.getTodoListNames();
    var allgemeinTodo = new TodoList("Allgemein");
    allgemeinTodo.addListItem(new TodoListItem("Allgemein_item0"));
    allgemeinTodo.addListItem(new TodoListItem("Allgemein_item1"));
    allgemeinTodo.addListItem(new TodoListItem("Allgemein_item2"));
    allgemeinTodo.addListItem(new TodoListItem("Allgemein_item3"));
    allgemeinTodo.addListItem(new TodoListItem("Allgemein_item4"));
    
    //Durchführung des Tests (Auswertung der Annahmen)
    ok(names.length == 5, "Es sind 5 todoListen Namen im persistenceMock hinterlegt");
    equal(names.length, 5, "Es sind 5 todoListen Namen im persistenceMock hinterlegt");
    
    //besser zu lösen mit arrayvergleich oder Schleife
    deepEqual(names, expectedNames, "ergebnisarray muss enthalten "+expectedNames)
    for(var i = 0;i<names.length;i++){
        ok(names[i] == expectedNames[i], "name["+i+"] muss "+expectedNames[i]+" sein.");
    }
    ok(names[0] == expectedNames[0], "Folgende Namen werden erwartet:"+expectedNames[0]);
    ok(names[1] == expectedNames[1], "Folgende Namen werden erwartet:"+expectedNames[1]);
    ok(names[2] == expectedNames[2], "Folgende Namen werden erwartet:"+expectedNames[2]);
    ok(names[3] == expectedNames[3], "Folgende Namen werden erwartet:"+expectedNames[3]);
    ok(names[4] == expectedNames[4], "Folgende Namen werden erwartet:"+expectedNames[4]);
    deepEqual(persistence.getTodoList("Allgemein"), allgemeinTodo, "Es wird erwartet, dass die Allgemein TodoList zurückgegeben wird")
});

test( "PersistenceMock putTest", function(){
    //Initialisierung des tests
    var listname = "PutTestListName";
    var todoList = new TodoList(listname);
    todoList.addListItem(new TodoListItem("put"));
    todoList.addListItem(new TodoListItem("put put"));
    todoList.addListItem(new TodoListItem("put put put"));
    var persistMock = new Persistence();
    persistMock.putTodoList(todoList);
    var nameList = persistMock.getTodoListNames();
    
    //Durchführung des Tests (Auswertung der Annahmen)
    ok(nameList.length == 6, "Die Anzahl der Listennamen muss jetzt 6 sein")
    deepEqual(listname, nameList[5], "Der Listenname muss dem Namen der 6. Liste entsprechen.")
    deepEqual(persistMock.getTodoList(listname), todoList, "die persistierte Todolist muss auch wieder zurückgeliefert werden.")
});

test("Test website functionality of productioncode", function(){
    //methodenaufruf
    removeEvenOddLayout();
    
    //daten sammeln
    var even_items = $(".item_even").length;
    var odd_items = $(".item_odd").length;
    
    //Auswertung der Annahmen
    equal(even_items,0, "Nach entfernen der css-Klassen keine even Items mehr vorhanden.");
    equal(odd_items ,0, "Nach entfernen der css-Klassen keine odd Items mehr vorhanden.");
    
    //methodenaufruf
    addEvenOddLayout();
    
    //daten sammeln
    even_items = $(".item_even").length;
    odd_items = $(".item_odd").length;
    
    //Auswertung der Annahmen
    equal(even_items,4, "Nach hinzufügen der css-Klassen 4 even Items mehr vorhanden.");
    equal(odd_items ,3, "Nach hinzufügen der css-Klassen 3 odd Items mehr vorhanden.");
    
    //methodenaufruf
    var itemId = "listitem5";
    removeItem(itemId);//wird beim drücken des löschen Buttons aufgerufen
    
    //daten sammeln
    even_items = $(".item_even").length;
    odd_items = $(".item_odd").length;
    var item5count = $("#listitem5").length;
    
    //Auswertung der Annahmen
    equal(even_items,3, "Nach hinzufügen der css-Klassen 4 even Items mehr vorhanden.");
    equal(odd_items ,3, "Nach hinzufügen der css-Klassen 3 odd Items mehr vorhanden.");
    equal(item5count, 0, "Das gelöschte Item darf nurnoch 0mal vorhanden sein");
    
    //methodenaufruf
    var newItemId = "newItem";
    var newItem =new TodoListItem("new Item name", newItemId) ;
    addItem(newItem);
    
    //Daten Sammeln
    var newItemCount = $("#"+newItemId).length;
    
    //Auswertung der Annahmen
    equal(newItemCount, 1, "New Item wurde erzeugt");
});