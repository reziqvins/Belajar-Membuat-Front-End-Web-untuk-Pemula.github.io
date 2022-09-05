
const books = [];
const RENDER_EVENT = 'render-books';

document.addEventListener(RENDER_EVENT, function () {
    const uncompletedTODOList = document.getElementById('belum-selesai');
    const listCompleted = document.getElementById('selesai');
  
    // clearing list item
    uncompletedTODOList.innerHTML = '';
    listCompleted.innerHTML = '';
  
    for (const bookItem of books) {
      const bookElement = makeBook(bookItem);
      if (bookItem.isCompleted) {
        listCompleted.append(bookElement);
      } else {
        uncompletedTODOList.append(bookElement);
      }
    }
  });

function generateId() {
  return +new Date();
}

function generateBookObject(id, judul, penulis, tanggal, penerbit, isCompleted) {
  return {
    id,
    judul,
    penulis,
    tanggal,
    penerbit,
    isCompleted
  }
}

function FindBook(bookId) {
  for (const bookItem of books) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }
  return null;
}

function FindBookIndex(bookId) {
  for (const index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }
  return -1;
}

function makeBook(bookObject) {

  const {id, judul,penulis,tanggal,penerbit, isCompleted} = bookObject;

  const textJudul = document.createElement('h3');
  textJudul.innerText = "Judul Buku : "+judul;
  

  const textPenulis = document.createElement('p');
  textPenulis.innerText = "Nama Penulis : "+penulis;

  const textPenerbit = document.createElement('p');
  textPenerbit.innerText = "Nama Penerbit : "+penerbit;

  const Tanggal = document.createElement('p');
  Tanggal.innerText = "Tanggal Terbit : "+ tanggal;

  const textContainer = document.createElement('div');
  textContainer.classList.add('inner');
  textContainer.append(textJudul,textPenulis ,textPenerbit,Tanggal);

  const container = document.createElement('div');
  container.classList.add('item', 'shadow')
  container.append(textContainer);
  container.setAttribute('id', `todo-${id}`);

  if (isCompleted) {

    const undoButton = document.createElement('button');
    undoButton.classList.add('undo-button');
    undoButton.addEventListener('click', function () {
      undoTaskFromCompleted(id);
    });

    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-button');
    trashButton.addEventListener('click', function () {
      removeTaskFromCompleted(id);
    });

    container.append(undoButton, trashButton);
  } else {

    const checkButton = document.createElement('button');
    checkButton.classList.add('check-button');
    checkButton.addEventListener('click', function () {
      addTaskToCompleted(id);
    });

    const undoButton = document.createElement('button');
    undoButton.classList.add('undo-button');
    undoButton.addEventListener('click', function () {
      undoTaskFromCompleted(id);
    });

    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-button');
    trashButton.addEventListener('click', function () {
      removeTaskFromCompleted(id);
    });

    container.append(checkButton,trashButton);
  }
  return container;
}

function addBook() {
  const textJudul = document.getElementById('judul').value;
  const textPenulis = document.getElementById('penulis').value;
  const textPenerbit = document.getElementById('penerbit').value;
  const textTahun = document.getElementById('date').value;

  const generatedID = generateId();
  const bookObject = generateBookObject(generatedID, textJudul, textPenulis, textPenerbit,textTahun, false)
  books.push(bookObject);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function addTaskToCompleted(bookId /* HTMLELement */) {

  const bookTarget = FindBook(bookId);
  if (bookTarget == null) return;

  bookTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function removeTaskFromCompleted(bookId /* HTMLELement */) {
  const bookTarget = FindBookIndex(bookId);

  if (bookTarget === -1) return;

  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function undoTaskFromCompleted(bookId /* HTMLELement */) {
  const bookTarget = FindBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

document.addEventListener('DOMContentLoaded', function () {
  const submitForm /* HTMLFormElement */ = document.getElementById('form');

  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addBook();
  });
  if (isStorageExist()) {
    loadDataFromStorage();
  }
  
});

function scrollForm() {
  var konten = document.getElementById("form");
  konten.scrollIntoView();
}
function scrollUncompl() {
  var konten = document.getElementById("belum-selesai");
  konten.scrollIntoView();
}

function scrollCompl() {
  var konten = document.getElementById("selesai");
  konten.scrollIntoView();
}


