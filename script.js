// getting the elements by  their ids
const listElm = document.getElementById("list-view");
const finshedListElm = document.getElementById("finished-list");
const hideelm = document.getElementById("hideMessage");

// create an array to store the task infromation from the user

let taskToDoArg = [];
let finshedToDoArg = [];

// created a from element in HTML where we have two input fields with their name. And we gave onsubmit to the form element with the parameter this.
// we created a new formdata with the event as the parameter. Then stored the values enter into the input filed to the constant variables

const handleOnSubmit = (e) => {
  const frmData = new FormData(e);
  const task = frmData.get("task");
  let hours = frmData.get("hour");

  const obj = {
    task,
    hours,
  };
  console.log(obj);

  taskToDoArg.push(obj);
  if (taskToDoArg.length >= 1) hideelm.style.display = "none";

  console.log(taskToDoArg);
  listDisplay();
};

// display function to display the content dynamically
const listDisplay = () => {
  let str = "";

  taskToDoArg.map((item, index) => {
    str += `
      <tr>
      <td>${index + 1}</td>
      <td id="task">${item.task}</td>
      <td>${item.hours + " hours"}</td>
      <td>
      <button onclick="transferArray(${index})" class="btn btn-success"><i class="fa-sharp fa-solid fa-arrow-right"></i>
      </button></td>
      <td>  <button onclick="deleteTask(${index})" class="btn btn-danger"><i class="fa-solid fa-trash"></i> </button></td>
      </tr>
      `;
  });

  listElm.innerHTML = str;
};

// create a onclick on the button then pass the clicked index . then splice the original arry as per the index and re call the function to display since the splice changes the array .
const transferArray = (index) => {
  console.log(index);
  const modifiedArray = taskToDoArg.splice(index, 1);
  finshedToDoArg.push(modifiedArray[0]);
  console.log("the dinised", finshedToDoArg);
  listDisplay();
  finishedDisplay();
};
const deleteTask = (index) => {};

// display function to display the content dynamically
const finishedDisplay = () => {
  let str = "";
  finshedToDoArg.map((item, index) => {
    str += ` 
        <tr>
        <td scope="row">${index + 1}</td>
        <td>${item.task}</td>
        <td>${item.hours}  hours</td>
        <th>
        <button class="btn btn-success" onclick="returnTask(${index})"><i class="fa-sharp fa-solid fa-arrow-left"></i>
        </button></th>
        <td>  <button class="btn btn-danger"><i class="fa-solid fa-trash"></i> </button></td>
        </tr>`;
  });

  finshedListElm.innerHTML = str;
};

const returnTask = (index) => {
  const item = finshedToDoArg.splice(index, 1);
  taskToDoArg.push(item[0]);
  listDisplay();
  finishedDisplay();
};
