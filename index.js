let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click" , addNote);

let edit = false;


function addNote(){
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");

  if(notes == null){
    notesObj = [];
  }else{
    notesObj = JSON.parse(notes);
  }
   if(addTxt.value.trim().length != 0){
     let data = {}
     data.id = new Date().valueOf();
     data.value = addTxt.value;
     data.isImportant = false
    notesObj.push(data);
    localStorage.setItem("notes" , JSON.stringify(notesObj));
    showNotes();
  }

  addTxt.value = "";

}

function showNotes(){
  let notes = localStorage.getItem("notes");
  if(notes == null){
    notesObj = [];
  }else{
    notesObj = JSON.parse(notes);
  }

  let myNotes = "";
  notesObj.forEach(function(element , index){
    console.log(element.isImportant)
    if(!element.isImportant){
    myNotes += `<div class="noteCard">
      <div id="${index}" class="card-deck card-deck1">
        <h5 class="catd-title"><strong>Note ${index + 1}</strong></h5><hr>
        <pre class="card-text">${element.value}</pre>
        <i id="${index}" onclick="deleteNote(this.id)" class="delete fa-solid fa-trash"></i>
        <i id="${index}" onclick="editNote(this.id)" class="edit fa-regular fa-pen-to-square"></i>
        <label class="mycheckbox">
          <input title="Important" id="${element.id}" type="checkbox" onchange="important(this.id)">
          <span class="checkmark"></span>
        </label>
      </div>

    </div>`
  }else{
    myNotes += `<div class="noteCard">
      <div id="${index}" class="card-deck card-deck1" style="background-color: #EEE8A9">
        <h5 class="catd-title"><strong>Note ${index + 1}</strong></h5><hr>
        <pre class="card-text">${element.value}</pre>
        <i id="${index}" onclick="deleteNote(this.id)" class="delete fa-solid fa-trash"></i>
        <i id="${index}" onclick="editNote(this.id)" class="edit fa-regular fa-pen-to-square"></i>
        <label class="mycheckbox">
          <input title="Important" id="${element.id}" type="checkbox" onchange="important(this.id)"  checked>
          <span class="checkmark"></span>
        </label>

      </div>

    </div>`
  }
  });

  let notesElm = document.getElementById("notes");
  if(notesObj.length != 0){
    notesElm.innerHTML = myNotes;
  }else{
    notesElm.innerHTML = "<p class='empty'>No notes available -</p>";
  }
}

function deleteNote(index){
  let notes = localStorage.getItem("notes");
  if(notes == null){
    notesObj = [];
  }else{
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index , 1);
  localStorage.setItem("notes" , JSON.stringify(notesObj));
  if(edit == true){
    edit = false;
    editIndex = undefined;
    addBtn.classList.remove("edit-btn");
  }

  document.getElementById("addTxt").value = "";
  showNotes();
}

function editNote(index){
  if(edit == true){
    let editText = document.getElementsByClassName('card-text')[index];
    let notes = localStorage.getItem("notes");
    notesObj = JSON.parse(notes);
    if(editText.innerText.trim().length != 0){
    notesObj[index].value = editText.innerText;
    localStorage.setItem("notes" , JSON.stringify(notesObj));
    document.getElementsByClassName('delete')[index].style.display = "block";
    document.getElementsByClassName('edit')[index].style.right = "0";
    document.getElementsByClassName('edit')[index].classList = "edit fa-regular fa-pen-to-square";
    document.getElementsByClassName('card-text')[index].style.backgroundColor = "#DBE2EF"
    document.getElementsByClassName('card-text')[index].contentEditable = "false"
    showNotes();
    edit = false;
    }
  }else{
  document.getElementsByClassName('delete')[index].style.display = "none";
  document.getElementsByClassName('edit')[index].style.right = "-32px";
  document.getElementsByClassName('edit')[index].classList = "edit fa-solid fa-plus";
  document.getElementsByClassName('card-text')[index].style.border = "0.5px solid #3F72AF"
  document.getElementsByClassName('card-text')[index].style.backgroundColor = "white"
  document.getElementsByClassName('card-text')[index].contentEditable = "true"
  edit = true;
}
}


function search_cards() {

    let input = document.getElementById('search').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('noteCard');
    let y = document.getElementsByClassName('card-text');


    for (i = 0; i < x.length; i++) {
        if (!y[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="inline-block";
        }
    }
}


function important(id){
  if(document.getElementById(id).checked){
    let notes = localStorage.getItem("notes");
    notesObj = JSON.parse(notes);
    // let ind;
    let x = document.getElementsByClassName('noteCard');
    for(let i=0 ;i<x.length ;i++){

      if(notesObj[i].id == id){
        document.getElementsByClassName('card-deck')[i].style.backgroundColor = "#EEE8A9";
        notesObj[i].isImportant = true;
        localStorage.setItem("notes" , JSON.stringify(notesObj));
        return;
      }
    }
  }else{
    let notes = localStorage.getItem("notes");
    notesObj = JSON.parse(notes);
    // let ind;
    let x = document.getElementsByClassName('noteCard');
    for(let i=0 ;i<x.length ;i++){

      if(notesObj[i].id == id){
        document.getElementsByClassName('card-deck')[i].style.backgroundColor = "#DBE2EF";
        notesObj[i].isImportant = false;
        localStorage.setItem("notes" , JSON.stringify(notesObj));
        return;
      }
    }
  }
}

showNotes();
