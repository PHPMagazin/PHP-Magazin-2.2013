/* 
 * In this file the persistencelayer is mocked
 */

function Persistence(){
    var listNames = ["Allgemein","Arbeit","Familie","Artikel","Karriere"];
    var todoLists = [];
    
    this.getTodoList = function(name){
        var todoList = todoLists[name];
        if(todoList == undefined){
            todoList = new TodoList(name);
            for(var i = 0;i<5;i++){
                todoList.addListItem(new TodoListItem(name+"_item"+i));
            }
        }
        return todoList;    
    }
    
    this.getTodoListNames = function(){
        return listNames;
    }
    
    this.putTodoList = function(todoList){
        listNames[listNames.length] = todoList.listname;
        todoLists[todoList.listname] = todoList;
    }
}
