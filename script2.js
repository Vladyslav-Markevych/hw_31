class Library {
  constructor(books) {
    this.books = [];
  }
  addBook(id) {
    this.books.push(id);
  }
  removeBook(id) {
    let del = this.books.indexOf(id);
    this.books.splice(del, 1);
  }
  findBooksByAuthor(author) {
    let findAuthor = this.books.find((elem) => elem.author == author);
    if (findAuthor) {
      console.log(`Книга знайдена:`, findAuthor);
    } else {
      console.log("Книгу не знайдено");
    }
  }
  listAvailableBooks() {
    let findavaliable = this.books.filter(
      (elem) => elem.availability == "available"
    );
    if (findavaliable) {
      console.log(`Книги знайдено:`, findavaliable);
    } else {
      console.log("Книгу не знайдено");
    }
  }
}

class User {
  constructor(name) {
    this.name = name;
    this.read = [];
  }

  borrowBook(name, library) {
    let order = library.books.find((elem) => elem.name == name);
    if (order) {
      if (order.availability == "available") {
        this.read.push(order);
        order.availability = "unavailable";
        console.log("Ви успішно орендували книгу");
      } else {
        console.log("Книгу неможливо орендувати");
      }
    } else {
      console.log(`Книгу не знайдено в біблиотеці`);
    }
  }

  returnBook(name, library) {
    let myBook = this.read.find((elem) => elem.name == name);
    if (!myBook) {
      console.log("Ви не орендували книгу");
    }
    let order = library.books.find((elem) => elem.name == name);
    if (order) {
      if (order.availability == "unavailable") {
        order.availability = "available";
        console.log(`Книгу повернено`);
      }
    } else {
      console.log(`Книгу не знайдено в біблиотеці`);
    }
  }
}

class Book {
  constructor(name, author, year) {
    this.name = name;
    this.author = author;
    this.year = year;
    this.availability = "available";
    this.rating = [];
  }
  addRating(user, mark) {
    let myBook = user.read.find((elem) => elem.name == name);
    if (!myBook) {
      console.log("Ви не орендували книгу");
    } else {
      this.rating.push(mark);
      console.log(`Оцінка додана`);
    }
  }
  getAverageRating() {
    let count = 0;
    for (const iterator of this.rating) {
      count += iterator;
    }
    if (count > 0) {
      let mark = count / this.rating.length;
      console.log(`Середня оцінка: ${mark.toFixed(2)}`);
    } else {
      console.log("У книги немає оцінок");
    }
  }
}

const library = new Library(); // Створення біблиотеки
const book = new Book("Назва1", "Автор1", 2021); // Створення книги
const book2 = new Book("Назва2", "Автор2", 2022);
const book3 = new Book("Назва3", "Автор3", 2023);
const book4 = new Book("Назва4", "Автор4", 2024);

library.addBook(book); // Додавання книги до біблиотеки
library.addBook(book2);
library.addBook(book3);
library.addBook(book4);
library.removeBook(book); // Видалення книги з біблиотеки

let user = new User("Ім'я"); // Новий користувач
user.borrowBook("Назва2", library); // Оренда книги
user.borrowBook("Назва4", library); // Оренда книги
user.returnBook("Назва2", library); // Повернення книги

book2.addRating(user, 5); // Додавання оцінки книзі
book2.addRating(user, 3);
book2.addRating(user, 2);

book2.getAverageRating(); // Виведення середньої оцінки книги.

library.findBooksByAuthor("Автор3"); // Пошук за автором

library.listAvailableBooks(); // Пошук вільних для оренди книг
