var taskInput=document.getElementById("new-task");// новая задача
var addButton=document.getElementsByTagName("button")[0]; // 1 кнопка
var incompleteTaskHolder=document.getElementById("incomplete-tasks");
var completedTasksHolder=document.getElementById("completed-tasks");//сделаль 

//новый элемент задачи
var createNewTaskElement=function(taskString)
{
	var listItem=document.createElement("li");
	var checkBox=document.createElement("input");
	var label=document.createElement("label");
	var editInput=document.createElement("input");
	var editButton=document.createElement("button");
	var deleteButton=document.createElement("button");
	var text_container = document.createElement("div");
	text_container.className="taskTextArea";
	label.innerText=taskString;
	label.className="taskText";
	checkBox.type="checkbox";
	editInput.type="text";
	editButton.innerText="Поменять";
	editButton.className="edit";
	deleteButton.innerText="Удалить";
	deleteButton.className="delete";

    // добавление
	text_container.appendChild(label);

	listItem.appendChild(checkBox);
	listItem.appendChild(text_container);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
}
var addTask=function()
{
	console.log("Add Task...");
	var listItem=createNewTaskElement(taskInput.value); // новый элемент
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

}

//изменить задачу
var editTask=function()
{
console.log("Edit Task...");
console.log("Change 'edit' to 'save'");
var listItem=this.parentNode;
var editInput=listItem.querySelector('input[type=text]');
var label=listItem.querySelector("label");
var containsClass=listItem.classList.contains("editMode");
		if(containsClass)
        {
			label.innerText=editInput.value;
		}
        else
        {
			editInput.value=label.innerText;
		}	
		listItem.classList.toggle("editMode");
}
var deleteTask=function()
{
		console.log("Delete Task...");
		var listItem=this.parentNode;
		var ul=listItem.parentNode;	
		ul.removeChild(listItem);
}
var taskCompleted=function()
{
		console.log("Complete Task...");
	
	
	var listItem=this.parentNode;
	completedTasksHolder.appendChild(listItem);
				bindTaskEvents(listItem, taskIncomplete);

}
var taskIncomplete=function()
{
		console.log("Incomplete Task...");

		var listItem=this.parentNode;
	incompleteTaskHolder.appendChild(listItem);
			bindTaskEvents(listItem,taskCompleted);
}
var ajaxRequest=function()
{
	console.log("AJAX Request");
}
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);
var bindTaskEvents=function(taskListItem,checkBoxEventHandler)
{
	console.log("bind list item events");

	var checkBox=taskListItem.querySelector("input[type=checkbox]");
	var editButton=taskListItem.querySelector("button.edit");
	var deleteButton=taskListItem.querySelector("button.delete");
			editButton.onclick=editTask;
			deleteButton.onclick=deleteTask;
			checkBox.onchange=checkBoxEventHandler;
}
	for (var i=0; i<incompleteTaskHolder.children.length;i++)
    {

		
		bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
	}
	for (var i=0; i<completedTasksHolder.children.length;i++)
    {
	
		bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
	}




