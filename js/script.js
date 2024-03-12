let name = document.getElementById('name');
let std = document.getElementById('std');
let contact = document.getElementById('contact');
let email = document.getElementById('email');
let course = document.getElementById('course');
let language = document.getElementById('language');
let birth = document.getElementById('birth');
let history = document.getElementById('history');
let select = document.getElementById('select');
let isEdit;

let selectCount = localStorage.getItem('selectCount') || 0;
let selectedDataArray = JSON.parse(localStorage.getItem('selectedData')) || [];

const viewresult = (existingFormData) => {
  history.innerHTML = " ";
  if (existingFormData.length > 0) {
    existingFormData.forEach((ele) => {
      history.innerHTML += `<div class="col-5 border border-white p-2 m-4 ">
      <h2 class="display-6 text-warning ">Admission Form</h2>
        <p>Name : ${ele.name}</p>  
        <p>Std : ${ele.std}</p>
        <p>Email : ${ele.email}</p>
        <p>Contact: ${ele.contact}</p>
        <p>Course : ${ele.course}</p>
        <p>Language : ${ele.language}</p>
        <p>Date of Birth : ${ele.birth}</p>
        <p>id : ${ele.id}</p>
        <button class="btn primary-color" onclick="editFormData(${ele.id})">Edit</button>
        <button class="btn primary-color" onclick="deleteFormData(${ele.id})">Delete</button>
        <button class="btn primary-color" onclick="selectFormData(${ele.id})">Select</button>
          </div>`;
    });
  } else {
    history.innerHTML = "<h3 class='text-center py-5'>No Data Found! Please Add a Record.</h3>";
  }
  // count the data you select  
  select.innerHTML = `${selectCount}+`;
}
select.innerHTML = `${selectCount}+`;
const getData = () => {
  return JSON.parse(localStorage.getItem('studentFormData')) || [];
}


let existingFormData = getData();
viewresult(existingFormData);

//  button on header to show selected data
const showSelectedData = () => {
  
  let selectedDataArray = JSON.parse(localStorage.getItem('selectedData')) || [];
  let selectedNames = selectedDataArray.map(data => data.name).join('  ||  ');
  document.getElementById('model-body').innerHTML = `<p>${selectedNames}</p>`;
  console.log("Selected names displayed");
}



const selectFormData = (id) => {
  let existingFormData = getData();
  let selectedData = existingFormData.find(data => data.id == id);
  let selectedDataArray = JSON.parse(localStorage.getItem('selectedData')) || [];
  selectedDataArray.push(selectedData);
  localStorage.setItem('selectedData', JSON.stringify(selectedDataArray));


  selectCount++;
  select.innerHTML = `${selectCount}+`;
  localStorage.setItem('selectCount', selectCount);
  console.log("Data stored in local storage");
}

const selectDelete = (id) => {
  let selectedDataArray = JSON.parse(localStorage.getItem('selectedData')) || [];
  let index = selectedDataArray.findIndex(data => data.id == id);

  if (index != -1) {
    selectedDataArray.splice(index, 1);
    localStorage.setItem('selectedData', JSON.stringify(selectedDataArray));
    selectCount = selectedDataArray.length;
    select.innerHTML = `${selectCount}+`;
  }
}



const clearForm = () => {
  name.value = "";
  std.value = "";
  contact.value = "";
  email.value = "";
  course.value = "";
  language.value = "";
  birth.value = "";
}

const editFormData = (id) => {
  let existingFormData = getData();
  let formDataToEdit = existingFormData.find(data => data.id == id);

  name.value = formDataToEdit.name;
  std.value = formDataToEdit.std;
  contact.value = formDataToEdit.contact;
  email.value = formDataToEdit.email;
  course.value = formDataToEdit.course;
  language.value = formDataToEdit.language;
  birth.value = formDataToEdit.birth;

  isEdit = id;
}

const submitform = () => {
  let existingFormData = getData();
  event.preventDefault();

  if (!isEdit) {
    var formData = {
      name: name.value,
      std: std.value,
      contact: contact.value,
      email: email.value,
      course: course.value,
      language: language.value,
      birth: birth.value,
      id: existingFormData.length > 0 ? existingFormData[existingFormData.length - 1].id + 1 : 1
    };

    existingFormData.push(formData);
  } else {
    existingFormData = existingFormData.map(data => {
      if (data.id == isEdit) {
        return {
          name: name.value,
          std: std.value,
          contact: contact.value,
          email: email.value,
          course: course.value,
          language: language.value,
          birth: birth.value,
          id: data.id
        };
      }
      return data;
    });

    isEdit = null;
  }

  localStorage.setItem('studentFormData', JSON.stringify(existingFormData));
  clearForm();
  viewresult(existingFormData);
}

const deleteFormData = (id) => {
  let existingFormData = getData();

  let index = existingFormData.findIndex(data => data.id == id);

  if (index !== -1) {
    existingFormData.splice(index, 1);
    localStorage.setItem('studentFormData', JSON.stringify(existingFormData));
    viewresult(existingFormData);
  }
  selectDelete(id);
}


