/* 
 * Define the BusinessObjects and their functions
 */

function TodoList(listname){
    this.listname = listname;
    this.listitems = [];
    this.addListItem = function(item){
        var currentIndex = this.listitems.length;
        this.listitems[currentIndex] = item;
    }
}

function TodoListItem(name,id){
    this.itemname = name;
    this.id = id;
    this.checked = false;
}


